import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from "redux-thunk";

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import burgerBuilder from './store/reducers/burgerBuilder';
import order from "./store/reducers/order";
import auth from "./store/reducers/auth"
import { combineReducers } from 'redux';


const composeEnhancers = 
    typeof window==='object' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
            window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
                // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
            }) : compose

const enhancers = composeEnhancers(applyMiddleware(thunk))

const reducer = combineReducers({
    burger : burgerBuilder,
    order : order,
    auth : auth
})
const store = createStore(reducer, enhancers);


const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);
console.log(store.getState())

ReactDOM.render( app, document.getElementById( 'root' ) );
registerServiceWorker();
