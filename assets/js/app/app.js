import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import Reducers from './reducers/Reducers';

import Sidebar from './components/Sidebar/Sidebar';
import LibraryExplorer from './components/LibraryExplorer/LibraryExplorer';
import Player from './components/Player/Player';

const store = createStore(
    Reducers,
    applyMiddleware(thunk),
);

class App extends React.Component {

    componentDidMount() {

    }

    render() {
        return (
            <div className="d-flex flex-column flex-wrap h-100 w-100 view-container">

                <div className="d-flex flex-row flex-fill h-100 w-100  explorer-container">
                    <Sidebar />
                    <LibraryExplorer />
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

