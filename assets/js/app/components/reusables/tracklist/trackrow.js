import React from 'react';
import { connect } from 'react-redux';

import Table from 'react-bootstrap/Table';

class TrackRow extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    render() {
        const { track } = this.props;

        return (
            <tr className="track-row" onDoubleClick={this.props.onDoubleClick}>
                <td className="track-number">
                    <p>#{track.trackNumber}</p>
                </td>
                <td className="track-info">
                    <p className="title">{track.title}</p>
                    <p className="artist">{track.albumArtist}</p>
                </td>
            </tr>
        );
    }

}

export default TrackRow;