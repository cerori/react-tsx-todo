import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import todos from './modules/todos';
import { restore } from './modules/todos';
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(todos, composeWithDevTools());

function loadData() {
  try {
    const data = localStorage.getItem('todo-app-data');
    console.log('loadData data: ' + data);

    if (!data) return;

    store.dispatch(restore(JSON.parse(data)));
  } catch (e) {
    console.log('localStorage is not working');
  }
}

loadData();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
