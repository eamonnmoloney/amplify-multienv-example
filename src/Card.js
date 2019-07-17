import React, { Component } from "react";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import { withAuthenticator, Connect } from "aws-amplify-react";
import 'rc-slider/assets/index.css';
import { makeStyles } from '@material-ui/core/styles';
import { Button, TextField, Grid, List, Typography, Slider, Card as MaterialCard, CardHeader, CardContent } from "@material-ui/core";
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
} from 'recharts';

import "./App.css";

import awsConfig from "./aws-exports";
import * as mutations from "./graphql/mutations";
import * as queries from "./graphql/queries";

Amplify.configure(awsConfig);

const EmotionListView = ({ emotions }) => {
      let data = emotions.sort((a,b)=> {
        if(a.title.toLowerCase() < b.title.toLowerCase()) { return -1; }
        if(a.title.toLowerCase() > b.title.toLowerCase()) { return 1; }
        return 0;
      }).map(emotion => ({
          subject: emotion.title, A: emotion.intensity, B: emotion.intensity, fullMark: 100,
        })
      );

  return (
    <RadarChart cx={300} cy={250} outerRadius={100} width={500} height={500} data={data}>
      <PolarGrid />
      <PolarAngleAxis dataKey="subject" />
      <PolarRadiusAxis />
      <Radar name="Mike" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
    </RadarChart>
  )
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
