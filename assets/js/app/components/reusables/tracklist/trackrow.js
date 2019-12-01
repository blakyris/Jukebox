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
        const { format, track } = this.props;
        
        if (format == "full") {
            return (
                <tr className="track-row full-row"
                    onDoubleClick={this.props.onDoubleClick}>
                    <td className="track-title">
                        <p className="title">{track.title}</p>
                    </td>
                    <td className="track-artist">
                        <p className="artist">{track.albumArtist}</p>
                    </td>
                    <td className="track-album">
                        <p className="album">{track.album}</p>
                    </td>
                </tr>
            );
        } else if (format == "responsive") {
            return (
                <tr className="track-row responsive-row"  onDoubleClick={this.props.onDoubleClick}>
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

}

export default TrackRow;