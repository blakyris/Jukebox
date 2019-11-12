import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { Icon } from 'react-icons-kit'
import {basic_clessidre} from 'react-icons-kit/linea/basic_clessidre'

import Table from 'react-bootstrap/Table';

import * as API from '../../constants/ApiConstants';
import { setTrack, setPlayQueue, setQueuePos } from '../../actions/PlayerActions';

class TrackList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            tracks: []
        }
    }

    componentDidMount() {
        axios.get(API.API_GET_ALL_TRACKS)
        .then((response) => {
            this.setState({
                isLoaded: true,
                tracks: response.data,
            });
        })
        .catch(function (error) {
            this.setState({
                isLoaded: true,
                error
            });
        });
    }

    handleClick(track) {
        this.props.playerSetTrack(track);
        this.props.playerSetPlayQueue(this.state.tracks);
        this.props.playerSetQueuePos(this.state.tracks.indexOf(track));
    }

    render() {
        const { isLoaded, tracks, error } = this.state;

        if (isLoaded) {
            if (error)
                return (
                    <div>An orrer occured while loading tracks.</div>
                );
            else {
                return (
                    <div className="d-flex flex-column track-list">
                        <Table hover size="sm" className="">
                            <tbody>
                                {tracks.map((track) => (
                                    <tr className="track-row" key={track.id} onDoubleClick={() => { this.handleClick(track) }}>
                                        <td><p className="noselect">{track.title}</p></td>
                                        <td><p className="noselect">{track.albumArtist}</p></td>
                                        <td><p className="noselect">{track.album}</p></td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                );
            }
        } else {
            return (
                <div className="loading">
                    <Icon icon={basic_clessidre} size={128}/>
                    <h4>Please Wait...</h4>
                </div>
            );
        }
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