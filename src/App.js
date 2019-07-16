import React, { Component } from "react";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import { withAuthenticator, Connect } from "aws-amplify-react";
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

import "./App.css";

import awsConfig from "./aws-exports";
import * as mutations from "./graphql/mutations";
import * as queries from "./graphql/queries";
import * as subscriptions from "./graphql/subscriptions";

Amplify.configure(awsConfig);

class App extends Component {
  render() {
    return (
      <div className="App">
        <h2>Graph goes here</h2>        
      </div>
    );
  }
}

export default App;
