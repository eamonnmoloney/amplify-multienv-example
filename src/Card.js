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

Amplify.configure(awsConfig);

const tmp1 = (emotion) => (
  <div>
    <ListItem>
      <Typography variant="body1" color="textSecondary" component="p">{emotion.title}</Typography>
    </ListItem>    
    {emotion.child ? 
    (<List>
      {emotion.child.map(child1 => {
          return tmp1(child1)})}
    </List>)
    : <div></div>}
  </div>
  
)

const EmotionListView = ({ emotions }) => {
  const ems = [].concat(emotions);
  const groupedEmotions = emotions.map(em => {
    if(!em.parent) {
      return em;
    }
    const parent = ems.filter(e => e.id === em.parent.id)[0]
    if(!parent.child){
      parent.child = [];
    }
    parent.child = parent.child.concat(em);
    return em;
  }).filter(em => !em.parent);

  return (
  <div>
    <List>
      {groupedEmotions.map(emotion => {
        return tmp1(emotion)               
      })}
    </List>
  </div>)
};

class Card extends Component {
  render() {
    return (
      <div className="App">        
        <Connect
          query={graphqlOperation(queries.emotionsForCard, {cardId: this.props.match.params.id, limit: 150})}
        >
          {({ data: { emotionsForCard }, loading, error }) => {
            if (error) return <h3>Error</h3>;
            if (loading) return <h3>Loading...</h3>;
            if (emotionsForCard && emotionsForCard.items.length !== 0) return <EmotionListView emotions={emotionsForCard.items}></EmotionListView>
            return <h3>No card yet...</h3>
            
          }}
        </Connect>
      </div>
    );
  }
}

export default Card;
