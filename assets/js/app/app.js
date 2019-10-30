import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {

    getAllTracks = () => {
        console.log("Fetching data...");
    }

    componentDidMount() {
        this.getAllTracks();
    }

    render() {
        return (
            <div className="container">
                <h1>Hello Symfony !</h1>
            </div>  
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));