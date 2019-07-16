import React, { Component } from "react";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import { withAuthenticator, Connect } from "aws-amplify-react";
import 'rc-slider/assets/index.css';
import { makeStyles } from '@material-ui/core/styles';
import { Button, TextField, Grid, List, ListItem } from "@material-ui/core";

import "./App.css";

import awsConfig from "./aws-exports";
import * as mutations from "./graphql/mutations";
import * as queries from "./graphql/queries";
import * as subscriptions from "./graphql/subscriptions";

Amplify.configure(awsConfig);

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
}));

const EmotionListView = ({ emotions }) => (
  <List>
    {emotions.map(emotion => (
        <ListItem key={emotion.id} style={{justifyContent:'center'}}>
          {emotion.name}          
        </ListItem>
      ))}
  </List>
);

class AddEmotion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    };    
  }

  handleChange(name, ev) {
    this.setState({ [name]: ev.target.value });
  }

  async submit() {
    const { onCreate } = this.props;
    var input = {
      name: this.state.name
    };

    this.setState({ name: "" });
    await onCreate({ input });
  }

  render() {
    return (
      <Grid container spacing={5} direction="row" justify="center" alignItems="center">
        <Grid item xs={6}>
          <TextField
            name="name"
            onChange={ev => {
              this.handleChange("name", ev);
            }}
            className={this.props.classes.textField}
            id="standard-full-width"
            label="Label"
            style={{ margin: 8 }}
            placeholder="Name"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />        
        </Grid>
        <Grid item xs={6}>
          <Button variant="contained" fullWidth className={this.props.classes.button} onClick={this.submit.bind(this)}>
            Add
          </Button>
        </Grid>
      </Grid>
    );
  }
}

const EmotionsPage = () => {
    const classes = useStyles();
    return (
      <div className="App">
        <h2>Emotions</h2>
        <Connect mutation={graphqlOperation(mutations.createEmotion)}>
          {({ mutation }) => <AddEmotion classes={classes} onCreate={mutation} />}
        </Connect>

        <Connect
          query={graphqlOperation(queries.listEmotions)}
          subscription={graphqlOperation(subscriptions.onCreateEmotion)}
          onSubscriptionMsg={(prev, { onCreateEmotion }) => {
            return {
              listEmotions: {
                items: [...prev.listEmotions.items, onCreateEmotion]
              }
            };
          }}
        >
          {({ data: { listEmotions }, loading, error }) => {
            if (error) return <h3>Error</h3>;
            if (loading) return <h3>Loading...</h3>;
            if (listEmotions && listEmotions.items.length !== 0) return <EmotionListView emotions={listEmotions.items}></EmotionListView>
            return <h3>No emotions yet...</h3>            
          }}
        </Connect>
      </div>
    );
}

export default withAuthenticator(EmotionsPage, true);
