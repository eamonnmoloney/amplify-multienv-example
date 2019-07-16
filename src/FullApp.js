import React, { Component } from "react";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import { withAuthenticator, Connect } from "aws-amplify-react";
import 'rc-slider/assets/index.css';
import { BrowserRouter as Router, Route, Link as RouterLink  } from 'react-router-dom'
import App from './App';
import EmotionsPage from './Emotions';
import Card from './Card';
import Cards from './Cards';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Tabs, Tab, Typography, Link } from "@material-ui/core";

import "./App.css";

import awsConfig from "./aws-exports";
import * as mutations from "./graphql/mutations";
import * as queries from "./graphql/queries";
import * as subscriptions from "./graphql/subscriptions";

Amplify.configure(awsConfig);

const useStyles = makeStyles(theme => ({
  link: {
    margin: theme.spacing(1),
  },
}));

const FullApp = () => {
    const classes = useStyles();
    return (
      <Router>
        <div>
          <Typography>
            <Link component={RouterLink} to="/" className={classes.link}>Home</Link>
            <Link component={RouterLink} to="/emotions/" className={classes.link}>Emotions</Link>
            <Link component={RouterLink} to="/cards/" className={classes.link}>Cards</Link>
          </Typography>

          <Route path="/" exact component={App} />
          <Route path="/emotions/" component={EmotionsPage} />
          <Route exact path="/cards/" component={Cards} />
          <Route path="/cards/:id" component={Card} />
        </div>
      </Router>
    );
  }

export default withAuthenticator(FullApp, true);
