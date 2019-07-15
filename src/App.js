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

const PostListView = ({ posts }) => (
  <div>
    {posts.map(post => (
        <div key={post.id}>
          {post.title}
          <Slider defaultValue={post.intensity ? post.intensity : 0} onAfterChange={value => {
            API.graphql(graphqlOperation(mutations.updatePost, {input: {name:post.name, intensity:value, id: post.id}}))
          } }/>
        </div>
      ))}
  </div>
);

const EmotionListView = ({ emotions }) => (
  <div>
    {emotions.map(emotion => (
        <div key={emotion.id}>
          {emotion.name}          
        </div>
      ))}
  </div>
);

const ListView = ({ blogs }) => (
  <div>
    <h2>All blogs</h2>
    <ul>
      {blogs.map(blog => (
        <li key={blog.id}>
          {blog.name}
          <Connect
            query={graphqlOperation(queries.getBlog, {id: blog.id})}
            subscription={graphqlOperation(subscriptions.onCreatePost)}
            onSubscriptionMsg={(prev, { onCreatePost }) => {
              return {
                listPosts: {
                  items: [...prev.listPosts.items, onCreatePost]
                }
              };
            }}
          >
            {({ data: { getBlog }, loading, error }) => {
              if (error) return <h3>Error</h3>;
              if (loading) return <h3>Loading...</h3>;
              if (getBlog) return <PostListView posts={getBlog.posts.items}></PostListView>
              return <div>No posts yet...</div>              
            }}
          </Connect>
        </li>
      ))}
    </ul>
  </div>
);

class AddTodo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: new Date()
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

    this.setState({ name: new Date() });    
    const blog = (await onCreate({ input })).data.createBlog;
    const emotions = (await API.graphql(graphqlOperation(queries.listEmotions))).data.listEmotions.items;
    emotions.map(async emotion => {
      await API.graphql(graphqlOperation(mutations.createPost, {input:{title:emotion.name, postBlogId: blog.id, intensity:0}}));
    });
  }

  render() {
    return (
      <div>
        <button
          style={{
            padding: "8px 16px",
            margin: "5px"
          }}
          onClick={this.submit.bind(this)}
        >
          Add
        </button>
      </div>
    );
  }
}

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
      <div>
        <input
          name="name"
          placeholder="name"
          onChange={ev => {
            this.handleChange("name", ev);
          }}
          style={{
            padding: "8px 16px",
            margin: "5px"
          }}
        />        
        <button
          style={{
            padding: "8px 16px",
            margin: "5px"
          }}
          onClick={this.submit.bind(this)}
        >
          Add
        </button>
      </div>
    );
  }
}

class AddPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      postBlogId: props.blog.id
    };
  }

  handleChange(title, ev) {
    this.setState({ [title]: ev.target.value });
  }

  async submit() {
    const { onCreate } = this.props;
    var input = {
      title: this.state.title,
      postBlogId: this.state.postBlogId
    };

    this.setState({ title: "" });
    await onCreate({ input });
  }

  render() {
    return (
      <div>
        <input
          name="title"
          placeholder="title"
          onChange={ev => {
            this.handleChange("title", ev);
          }}
          style={{
            padding: "8px 16px",
            margin: "5px"
          }}
        />        
        <button
          style={{
            padding: "8px 16px",
            margin: "5px"
          }}
          onClick={this.submit.bind(this)}
        >
          Add
        </button>
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <h2>Emotions</h2>
        <Connect mutation={graphqlOperation(mutations.createEmotion)}>
          {({ mutation }) => <AddEmotion onCreate={mutation} />}
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

        <h2>Add Blog</h2>
        <Connect mutation={graphqlOperation(mutations.createBlog)}>
          {({ mutation }) => <AddTodo onCreate={mutation} />}
        </Connect>        

        <Connect
          query={graphqlOperation(queries.listBlogs)}
          subscription={graphqlOperation(subscriptions.onCreateBlog)}
          onSubscriptionMsg={(prev, { onCreateBlog }) => {            
            return {
              listBlogs: {
                items: [...prev.listBlogs.items, onCreateBlog]
              }
            };
          }}
        >
          {({ data: { listBlogs }, loading, error }) => {
            if (error) return <h3>Error</h3>;
            if (loading) return <h3>Loading...</h3>;
            if (listBlogs && listBlogs.items.length !== 0) return <ListView blogs={listBlogs.items}></ListView>
            return <h3>No blogs yet...</h3>
            
          }}
        </Connect>
      </div>
    );
  }
}

export default withAuthenticator(App, true);
