import React from 'react';
import ReactDOM from 'react-dom';
import FullApp from './FullApp';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<FullApp />, div);
  ReactDOM.unmountComponentAtNode(div);
});
