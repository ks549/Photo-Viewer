import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from 'redux';
import logger from "redux-logger";
import thunk from 'redux-thunk';
import App from "./App.jsx";
import { Provider } from 'react-redux';
import allReducer from './Reducer';
import './index.scss';

var store = createStore(allReducer, applyMiddleware(thunk, logger));

const rootElement = document.getElementById("root");
ReactDOM.render((<Provider store={store}><App /></Provider>), rootElement);


