import React from 'react';

import Table from 'react-bootstrap/Table';

const API_GET_TRACKS = "http://127.0.0.1/api/library/tracks/get/all";

class TrackList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            tracks: []
        }
    }

    componentDidMount() {
        fetch(API_GET_TRACKS)
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

    startStream(id) {

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
                                    <tr key={track.id} onClick={this.startStream(track.id)}>
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

export default TrackList;