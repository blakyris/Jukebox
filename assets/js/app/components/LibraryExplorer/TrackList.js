import React from 'react';
import { connect } from 'react-redux';

import Table from 'react-bootstrap/Table';

import { setTrack, setPlayQueue, setQueuePos } from '../../actions/PlayerActions';

class TrackList extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    handleClick(track) {
        this.props.playerSetTrack(track);
        this.props.playerSetPlayQueue(this.props.tracks);
        this.props.playerSetQueuePos(this.props.tracks.indexOf(track));
    }

    render() {
        return (
            <div className="track-list">
                <Table hover size="md" className="list">
                    <tbody>
                        {this.props.tracks.map((track) => (
                            <tr className="track-row" key={track.id} onDoubleClick={() => { this.handleClick(track) }}>
                                <td><p className="title">{track.title}</p></td>
                                <td><p className="artist">{track.albumArtist}</p></td>
                                <td><p className="album">{track.album}</p></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        );
    }

}

const mapDispatchToProps = (dispatch) => {
    return {

        playerSetTrack: (track) => {
            dispatch(setTrack(track));
        },

        playerSetPlayQueue: (queue) => {
            dispatch(setPlayQueue(queue));
        },

        playerSetQueuePos: (pos) => {
            dispatch(setQueuePos(pos));
        },

    };
}


export default connect(null, mapDispatchToProps)(TrackList);