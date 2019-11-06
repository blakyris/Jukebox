import React from 'react';
import ReactDOM from 'react-dom';

import Sidebar from './components/Sidebar/Sidebar';
import LibraryExplorer from './components/LibraryExplorer/LibraryExplorer';
import Player from './components/Player/Player';

class App extends React.Component {

    componentDidMount() {

    }

    render() {
        return (
            <div className="d-flex flex-column p-0 h-100 w-100 app">
                <div className="d-flex flex-row flex-wrap h-100 w-100 view-container">
                        <Sidebar />
                        <LibraryExplorer />
                </div>
                <div className="d-flex flex-row w-100 player-container">
                    <Player />
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <App />
    , document.getElementById('root'));

