import React, { Component } from "react";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import { withAuthenticator, Connect } from "aws-amplify-react";
import 'rc-slider/assets/index.css';

import "./App.css";

import awsConfig from "./aws-exports";
import * as mutations from "./graphql/mutations";
import * as queries from "./graphql/queries";
import * as subscriptions from "./graphql/subscriptions";

const d3 = require("d3")

Amplify.configure(awsConfig);

class App extends Component {
  state = {
    data: null,
  };

  onSelect(event){
    console.log(event);
  }

  componentWillMount() {
    this.sunburst().then(data => {
      console.log("done")
    })
  }

  addSizeWhenNoChildren(em){
    if(em.children){
      em.children.map(ch => this.addSizeWhenNoChildren(ch));
      em.value = null;    
    } else {
      em.value = 1;    
    }
  }

  async buildData(){
    const listOfCards = await Promise.all([API.graphql(graphqlOperation(queries.listCards, {limit: 150}))]);
    const emotions = await Promise.all(listOfCards[0].data.listCards.items.map(async card => {
      const ems1 = (await API.graphql(graphqlOperation(queries.emotionsForCard, {cardId: card.id, limit: 150}))).data.emotionsForCard.items;
      const ems = [].concat(ems1);
      const groupedEmotions = ems.map(em => {
        em.name = em.title;
        if(!em.parent) {
          return em;
        }
        const parent = ems.filter(e => e.id === em.parent.id)[0]
        if(!parent.children){
          parent.children = [];
        }
        parent.children = parent.children.concat(em);
        return em;
      }).filter(em => !em.parent);
      
      return groupedEmotions;
    }));

    const rootEm = emotions[0];

    rootEm.map(re => this.addSizeWhenNoChildren(re));

    console.log(rootEm)

    return { name: "root", children:rootEm};
  }

  async sunburst() {
    const data = await this.buildData();
    
    const color = d3.scaleOrdinal(d3.quantize(d3.interpolateRainbow, data.children.length + 1))
    const format = d3.format(",d")
    const width = 975
    const radius = width / 2
    const arc = d3.arc()
      .startAngle(d => d.x0)
      .endAngle(d => d.x1)
      .padAngle(d => Math.min((d.x1 - d.x0) / 2, 0.005))
      .padRadius(radius / 2)
      .innerRadius(d => d.y0)
      .outerRadius(d => d.y1 - 1)
      
    const partition = data1 => d3.partition()
        .size([2 * Math.PI, radius])
      (d3.hierarchy(data1)
        .sum(d => d.value)
        .sort((a, b) => b.value - a.value))

    const root = partition(data);
  
    const svg = d3.select('div#sunburst').append("svg")
        .style("max-width", "100%")
        .style("height", "auto")
        .style("font", "10px sans-serif")
        .style("margin", "5px");
    
    svg.append("g")
        .attr("fill-opacity", 0.6)
      .selectAll("path")
      .data(root.descendants().filter(d => d.depth))
      .enter().append("path")
        .attr("fill", d => { while (d.depth > 1) d = d.parent; console.log(d); if(d.data.intensity === 0){return '000'}return color(d.data.name); })
        .attr("d", arc)
      .append("title")
        .text(d => `${d.ancestors().map(d => d.data.name).reverse().join("/")}\n${format(d.value)}`);
  
    svg.append("g")
        .attr("pointer-events", "none")
        .attr("text-anchor", "middle")
      .selectAll("text")
      .data(root.descendants().filter(d => d.depth && (d.y0 + d.y1) / 2 * (d.x1 - d.x0) > 10))
      .enter().append("text")
        .attr("transform", function(d) {
          const x = (d.x0 + d.x1) / 2 * 180 / Math.PI;
          const y = (d.y0 + d.y1) / 2;
          return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
        })
        .attr("dy", "0.35em")
        .text(d => d.data.name);
  
    await svg.node();
  
    svg.attr("viewBox", this.autoBox);
  }

  autoBox() {
    const {x, y, width, height} = this.getBBox();
    return [x, y, width, height];
  }

  render() {
    return (
      <div className="App" id="sunburst">
      </div>
    );
  }
}

export default App;
