import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import * as API from '../../constants/ApiConstants';
import Loading from '../Utils/Loading';
import TrackList from '../reusables/tracklist/tracklist';
import AlbumGrid from '../reusables/album-grid/album-grid';

class ArtistPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            cancelToken: axios.CancelToken.source().token,
            artist: null,
        }
    }

    componentDidMount() {
        axios.get(API.API_GET_ARTIST_BY_ID + this.props.viewContainer.data, {
            cancelToken: this.state.cancelToken
        }).then((response) => {
            this.setState({
                isLoaded: true,
                artist: response.data,
            });
        }).catch((error) => {
            if (axios.isCancel(error)) {
                return null;
            } else {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        });
    }

    render() {
        const { isLoaded, artist, error } = this.state;

        if (isLoaded) {
            return (
                <div className="artist-page">
                    <div className="header">
                        <div className="artist-pic">
                            <div className="img">

                            </div>
                        </div>
                        <div className="artist-info">
                            <h1 className="name">{artist.name}</h1>
                            <h3 className="desc"></h3>
                        </div>
                    </div>
                    <div className="content">

                        <div className="section popular-tracks">
                            <div className="section-title">
                                <h2>Popular Tracks</h2>
                            </div>

                        </div>

                        <div className="section artist-albums">
                            <div className="section-title">
                                <h2>Albums</h2>
                            </div>
                            <AlbumGrid albums={artist.albums} />
                        </div>

                    </div>
                </div>
            );
        } else {
            return (<Loading />);
        }

    }

}

const mapStateToProps = (state) => {
    return state;
}

const mapDispatchToProps = (dispatch) => {
    return {

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ArtistPage);