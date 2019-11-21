import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import Reducers from './reducers/Reducers';

import Sidebar from './components/Sidebar/Sidebar';
import ViewContainer from './components/ViewContainer';
import LibraryExplorer from './components/LibraryExplorer/LibraryExplorer';
import Player from './components/Player/Player';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    Reducers,
    composeEnhancers(applyMiddleware(thunk))
);

class App extends React.Component {

    componentDidMount() {

    }

    render() {
        return (
            <div className="d-flex flex-column flex-wrap h-100 w-100 app">
                <div className="d-flex flex-row flex-fill h-100 w-100 app-container">
                    <Sidebar />
                    <ViewContainer />
                </div>
                <div className="d-flex flex-column fixed-bottom player-container">
                    <Player />
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root'));

