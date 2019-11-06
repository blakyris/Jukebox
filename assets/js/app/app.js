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
    <App />
    , document.getElementById('root'));

