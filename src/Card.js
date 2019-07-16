import React, { Component } from "react";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import { withAuthenticator, Connect } from "aws-amplify-react";
import 'rc-slider/assets/index.css';
import { makeStyles } from '@material-ui/core/styles';
import { Button, TextField, Grid, List, Typography, Slider, Card as MaterialCard, CardHeader, CardContent } from "@material-ui/core";

import "./App.css";

import awsConfig from "./aws-exports";
import * as mutations from "./graphql/mutations";
import * as queries from "./graphql/queries";

Amplify.configure(awsConfig);

const EmotionListView = ({ emotions }) => (
  <div>
    {emotions.sort((a,b)=> {
      if(a.title.toLowerCase() < b.title.toLowerCase()) { return -1; }
      if(a.title.toLowerCase() > b.title.toLowerCase()) { return 1; }
      return 0;
    }).map(emotion => (
        <MaterialCard key={emotion.id} style={{padding: '1em'}}>
          <CardContent>
            <Typography variant="body1" color="textSecondary" component="p">{emotion.title}</Typography>
            <Slider defaultValue={emotion.intensity ? emotion.intensity : 0} onChangeCommitted={(e, value) => {
              API.graphql(graphqlOperation(mutations.updatePost, {input: {name:emotion.name, intensity:value, id: emotion.id}}))
            } }/>
          </CardContent>
        </MaterialCard>
      ))}
  </div>
);

class Card extends Component {
  render() {
    return (
      <div className="App">        
        <Connect
          query={graphqlOperation(queries.getCard, {id: this.props.match.params.id})}          
        >
          {({ data: { getCard }, loading, error }) => {
            if (error) return <h3>Error</h3>;
            if (loading) return <h3>Loading...</h3>;
            if (getCard && getCard.posts.items.length !== 0) return <EmotionListView emotions={getCard.posts.items}></EmotionListView>
            return <h3>No card yet...</h3>
            
          }}
        </Connect>
      </div>
    );
  }
}

export default withAuthenticator(Card, true);
