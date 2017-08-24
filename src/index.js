import React from 'react';
import ReactDOM from 'react-dom';
import App from './Component/App';
import {Provider} from 'react-redux';
import {createStore,applyMiddleware} from 'redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk';

import {fetchMemes} from './actions';

const store= createStore(rootReducer,applyMiddleware(thunk));

store.subscribe(() => console.log('store',store.getState()) );
store.dispatch(fetchMemes());

ReactDOM.render(
<Provider store={store}>
<App />
</Provider>
, document.getElementById('root')

)
