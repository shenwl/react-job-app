import React from 'react'
import ReactDom from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'

import reducers from './reducer'
import './config'

const store = createStore(reducers, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
))

ReactDom.render(
    (<Provider store={store}>
        <BrowserRouter>
            <div>
                <Route path='/login'></Route>
                <Route path='/register'></Route>
            </div>
        </BrowserRouter>
    </Provider>),
    document.getElementById('root')
)



