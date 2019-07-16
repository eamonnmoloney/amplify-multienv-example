import React from 'react';
import ReactDOM from 'react-dom';
import EmotionsPage from './Emotions';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<EmotionsPage />, div);
  ReactDOM.unmountComponentAtNode(div);
});
