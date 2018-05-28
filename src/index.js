import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import thunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';

import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";

import { Router } from "react-router-dom";


import state from "./data/reducers";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(state, composeEnhancers(applyMiddleware(thunk)));


ReactDOM.render(
    <Provider store={ store }>
      <BrowserRouter>
            <App />
      </BrowserRouter>
    </Provider>,

    document.getElementById("root")
);
