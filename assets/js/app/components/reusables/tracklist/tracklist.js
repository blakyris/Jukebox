import React from 'react';
import { connect } from 'react-redux';

import Table from 'react-bootstrap/Table';
import TrackRow from './trackrow';

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
                        {this.props.tracks.map(track => {
                            return (
                                <TrackRow key={track.id} format={this.props.format || "full"} track={track}
                                          onDoubleClick={() => { this.handleClick(track)  }}
                                />
                            );
                        })}
                    </tbody>
                </Table>
            </div>
        );
    }

}

const mapDispatchToProps = (dispatch) => {
    return {

        playerSetTrack: (track) => {
            dispatch({
                type: "PLAYER_SET_TRACK",
                track: track,
            });
        },

        playerSetPlayQueue: (queue) => {
            dispatch({
                type: "PLAYER_SET_PLAY_QUEUE",
                playQueue: queue,
            });
        },

        playerSetQueuePos: (pos) => {
            dispatch({
                type: "PLAYER_SET_QUEUE_POSITION",
                queuePos: pos,
            });
        },

    };
}

export default connect(null, mapDispatchToProps)(TrackList);