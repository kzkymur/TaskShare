import React from 'react';
import {render} from 'react-dom';
import { createStore as reduxCreateStore, combineReducers, } from 'redux';
import { Provider } from 'react-redux';

import reducer from './reducer.js';
import App from './App.jsx';

const createStore = () =>  {
	return reduxCreateStore(
		combineReducers({
			reducer,
		})
	)
}

const store = createStore();
render(
	<Provider store={store}>
		<App/>
	</Provider>,
	document.getElementById('root')
)
