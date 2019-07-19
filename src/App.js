import React, { Component } from "react";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import { withAuthenticator, Connect } from "aws-amplify-react";
import 'rc-slider/assets/index.css';

import "./App.css";

import awsConfig from "./aws-exports";
import * as mutations from "./graphql/mutations";
import * as queries from "./graphql/queries";
import * as subscriptions from "./graphql/subscriptions";
import SunburstChart from './SunburstChart';

const d3 = require("d3")

Amplify.configure(awsConfig);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    };    
  }

  componentDidMount(){
    this.buildData().then(data => {
      this.setState({ data })      
    });
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
    let ems = [];
    let emap = new Map()
    const listOfCards = await API.graphql(graphqlOperation(queries.listCards, {limit: 150}));
    await Promise.all(listOfCards.data.listCards.items.map(async card => {      
      const ems1 = (await API.graphql(graphqlOperation(queries.emotionsForCard, {cardId: card.id, limit: 150}))).data.emotionsForCard.items;
      ems1.forEach(element => {
        if(emap.has(element.title)){
          emap.get(element.title).push(element)
          return
        }       
        emap.set(element.title, [element]) 
      });
    }));

    for(const next of emap.values()) {
      ems.push(next.reduce((a, c) => {
        a.intensity = a.intensity + c.intensity
        return a
      }))
    }
    
    let groupedEmotions = ems.map(em => {
      em.name = em.title;
      if(!em.parent) {
        return em;
      }
      
      const parent = ems.filter(e => e.title === em.parent.title)[0]
      
      if(!parent.children){
        parent.children = [];
      }
      parent.children = parent.children.concat(em);
      return em;
    }).filter(em => !em.parent);

    groupedEmotions.map(re => this.addSizeWhenNoChildren(re));

    groupedEmotions = groupedEmotions.sort((a,b) => {
      return ('' + a.title).localeCompare(b.title)
    })

    groupedEmotions.forEach(em => {
      if(!em.children) {
        return
      }
      
      em.children.forEach(em1 => {
        if(!em1.children) {
          return
        }
        
        em1.children = em1.children.sort((a,b) => {
          return ('' + a.title).localeCompare(b.title)
        })
      })

      em.children = em.children.sort((a,b) => {
        return ('' + a.title).localeCompare(b.title)
      })
    })

    return { name: "root", children:groupedEmotions};
  }

  render() {
    return (
      <SunburstChart data={this.state.data}></SunburstChart>
    );
  }
}

export default App;
