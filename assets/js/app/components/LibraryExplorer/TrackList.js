import React from 'react';
import { connect } from 'react-redux';

import Table from 'react-bootstrap/Table';

import * as API from '../../constants/ApiConstants';

class TrackList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            tracks: []
        }
    }

    componentDidMount() {
        fetch(API.API_GET_ALL_TRACKS)
            .then(response => response.json())
            .then(
                (data) => {
                    this.setState({
                        isLoaded: true,
                        tracks: data
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            );
    }

    startStream(track) {
        this.props.playerSetTrack(track);
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
                    <div className="d-flex flex-column m-0 p-0 track-list">
                        <Table hover size="sm" className="">
                            <tbody>
                                {tracks.map((track) => (
                                    <tr key={track.id} onDoubleClick={() => { this.startStream(track) }}>
                                        <td>{track.title}</td>
                                        <td>{track.albumArtist}</td>
                                        <td>{track.album}</td>
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
                    <p>Loading...</p>
                </div>
            );
        }
    }

}

const mapDispatchToProps = (dispatch) => {
    return {
    
      playerSetTrack: (track) => {
        dispatch({
          type: 'PLAYER_SET_TRACK',
          trackId: track.id,
          trackMetadata: track
        })
      },
  
      playTrack: () => {
        dispatch({
          type: 'PLAYER_PLAY_TRACK',
        })
      },


    };
  }
  

export default connect(null, mapDispatchToProps) (TrackList);