import React, { Component } from "react";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import { withAuthenticator, Connect } from "aws-amplify-react";
import 'rc-slider/assets/index.css';
import { makeStyles } from '@material-ui/core/styles';
import { Button, TextField, Grid, List, Typography, Slider, Card as MaterialCard, CardHeader, CardContent, GridList, GridListTile, ListItem } from "@material-ui/core";
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
} from 'recharts';

import "./App.css";

import awsConfig from "./aws-exports";
import * as mutations from "./graphql/mutations";
import * as queries from "./graphql/queries";
import * as subscriptions from "./graphql/subscriptions";
import SunburstChart from './SunburstChart';

Amplify.configure(awsConfig);

class SunburstCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
    this.clicked = this.clicked.bind(this);
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
    const ems1 = (await API.graphql(graphqlOperation(queries.emotionsForCard, {cardId: this.props.match.params.id, limit: 150}))).data.emotionsForCard.items;
    const ems = [].concat(ems1);
    let groupedEmotions = ems.map(em => {
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

  clicked(node) {    
    API.graphql(graphqlOperation(mutations.updatePost, {input: {title:node.data.name, intensity:100, id: node.data.id}})).then(()=>{
      this.buildData().then(data => {
        this.setState({ data })      
      });
    })
  }

  render() {
    return (
      <div>
        <SunburstChart data={this.state.data} clicked={this.clicked}></SunburstChart>
      </div>
    );
  }
}

export default SunburstCard;
