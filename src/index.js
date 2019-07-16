import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import EmotionsPage from './Emotions';
import Card from './Card';
import Cards from './Cards';
import * as serviceWorker from './serviceWorker';
// First we import some modules...
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

ReactDOM.render((
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/emotions/">Emotions</Link>
            </li>
            <li>
              <Link to="/cards/">Cards</Link>
            </li>
          </ul>
        </nav>

        <Route path="/" exact component={App} />
        <Route path="/emotions/" component={EmotionsPage} />
        <Route exact path="/cards/" component={Cards} />
        <Route path="/cards/:id" component={Card} />
      </div>
    </Router>
  ), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
