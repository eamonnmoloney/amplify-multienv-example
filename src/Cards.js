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
          <Link component={RouterLink} to={`/cards/${card.id}`}>{card.name}</Link>
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
    const emotions = (await API.graphql(graphqlOperation(queries.listEmotions, {limit: 150}))).data.listEmotions.items;
    
    let rootPosts = await Promise.all(emotions.filter(emotion => !emotion.parent).map(async emotion => {      
      return (await API.graphql(graphqlOperation(mutations.createPost, {input:{title:emotion.name, postCardId: card.id, intensity:0}}))).data.createPost;
    }));

    rootPosts = await Promise.all(emotions
      .filter(emotion => emotion.parent)
      .filter(emotion => {
        return emotions.filter(em => !em.parent).filter(em => em.name === emotion.parent.name).length !== 0
      }).map(async emotion => {
        const root = rootPosts.filter(post => post.title === emotion.parent.name);
        const parentId = root.length > 0 ? root[0].id : null;
        return (await API.graphql(graphqlOperation(mutations.createPost, {input:{title:emotion.name, postCardId: card.id, intensity:0, postParentId: parentId}}))).data.createPost;
      }));
    
    await Promise.all(emotions
      .filter(emotion => emotion.parent)
      .filter(emotion => {
        return emotions.filter(em => em.parent).filter(em => em.name === emotion.parent.name).length !== 0
      }).map(async emotion => {
        console.log(JSON.stringify(emotion))
        const root = rootPosts.filter(post => post.title === emotion.parent.name);
        console.log(JSON.stringify(rootPosts))
        const parentId = root.length > 0 ? root[0].id : null;
        await API.graphql(graphqlOperation(mutations.createPost, {input:{title:emotion.name, postCardId: card.id, intensity:0, postParentId: parentId}}));
      }));    
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
          query={graphqlOperation(queries.listCards, {limit:150})}
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
