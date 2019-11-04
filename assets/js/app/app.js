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
            <div className="d-flex flex-column p-0 h-100">
                <div className="d-flex flex-row vh-100">
                        <Sidebar />
                        <LibraryExplorer />
                </div>
                <Player />
            </div>
        );
    }
}

ReactDOM.render(
    <App />
    , document.getElementById('root'));

