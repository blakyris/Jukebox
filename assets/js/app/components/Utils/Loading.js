import React from 'react';

class Loading extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="flex-fill loading py-3">
                <div className="spinner"></div>
                <div className="message">
                    <p className="m-0 p-0">Loading...</p>
                </div>
            </div>
        );
    }
}

export default Loading;