import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { Icon } from 'react-icons-kit'
import {basic_clessidre} from 'react-icons-kit/linea/basic_clessidre'

import Table from 'react-bootstrap/Table';

import Loading from '../Utils/Loading';
import * as API from '../../constants/ApiConstants';
import { setTrack, setPlayQueue, setQueuePos } from '../../actions/PlayerActions';

class TrackList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoaded: false,
            tracks: {},
        };
    }

    componentDidMount() {
        axios.get(API.API_GET_ALL_TRACKS)
            .then((response) => {
                console.log("Response : ", response);
                this.setState({
                    isLoaded: true,
                    tracks: response.data,
                });
            })
            .catch((error) => {
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
                    <div className="track-list noselect">
                        <Table hover size="md" className="list noselect">
                            <tbody>
                                {tracks.map((track) => (
                                    <tr className="track-row noselect" key={track.id} onDoubleClick={() => { this.handleClick(track) }}>
                                        <td><p className="title noselect">{track.title}</p></td>
                                        <td><p className="artist noselect">{track.albumArtist}</p></td>
                                        <td><p className="album noselect">{track.album}</p></td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                );
            }
        } else {
            return (
                <Loading />
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