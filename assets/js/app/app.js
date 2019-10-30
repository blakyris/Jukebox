import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {

    componentDidMount() {
        
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