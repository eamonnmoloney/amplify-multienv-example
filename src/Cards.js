import React, { Component } from "react";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import { withAuthenticator, Connect } from "aws-amplify-react";
import 'rc-slider/assets/index.css';
import { BrowserRouter as Router, Route, Link as RouterLink } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import { Button, TextField, Grid, List, ListItem, Link, Paper } from "@material-ui/core";

import "./App.css";

import awsConfig from "./aws-exports";
import * as mutations from "./graphql/mutations";
import * as queries from "./graphql/queries";
import * as subscriptions from "./graphql/subscriptions";

Amplify.configure(awsConfig);

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
  },
}));

const ListView = ({ classes, cards }) => (
  <List>
    {cards.sort((a,b)=> {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    }).reverse().map(card => (
      <ListItem key={card.id} style={{padding:10, justifyContent: 'center'}}>
        <Paper className={classes.root}>
          <Link component={RouterLink}  to={`/cards/${card.id}`}>{card.name}</Link>
        </Paper>
      </ListItem>
    ))}
  </List>
);

class AddTodo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: new Date(),
      createdAt: new Date()
    };
  }

  handleChange(name, ev) {
    this.setState({ [name]: ev.target.value });
  }

  async submit() {
    const { onCreate } = this.props;
    var input = {
      name: this.state.name,
      createdAt: new Date()
    };

    this.setState({ name: new Date(), createdAt: new Date() });    
    const card = (await onCreate({ input })).data.createCard;
    const emotions = (await API.graphql(graphqlOperation(queries.listEmotions))).data.listEmotions.items;
    emotions.map(async emotion => {
      await API.graphql(graphqlOperation(mutations.createPost, {input:{title:emotion.name, postBlogId: card.id, intensity:0}}));
    });
  }

  render() {
    return (
      <div>
        <Button variant="contained" color="primary" className={this.props.classes.button} onClick={this.submit.bind(this)}>
          Add
        </Button>
      </div>
    );
  }
}

const Cards = () => {
    const classes = useStyles();
    return (
      <div className="App">
        <h2>Add Card</h2>
        <Connect mutation={graphqlOperation(mutations.createCard)}>
          {({ mutation }) => <AddTodo classes={classes} onCreate={mutation} />}
        </Connect>        

        <Connect
          query={graphqlOperation(queries.listCards, {createdAt:{beginsWith:2018}})}
          subscription={graphqlOperation(subscriptions.onCreateCard)}
          onSubscriptionMsg={(prev, { onCreateCard }) => {            
            return {
              listCards: {
                items: [...prev.listCards.items, onCreateCard]
              }
            };
          }}
        >
          {({ data: { listCards }, loading, error }) => {
            if (error) return <h3>Error</h3>;
            if (loading) return <h3>Loading...</h3>;
            if (listCards && listCards.items.length !== 0) return <ListView classes={classes} cards={listCards.items}></ListView>
            return <h3>No cards yet...</h3>
            
          }}
        </Connect>
      </div>
    );
}

export default Cards;
