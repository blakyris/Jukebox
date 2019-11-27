import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import * as API from '../../constants/ApiConstants';
import Loading from '../Utils/Loading';
import TrackList from '../LibraryExplorer/TrackList';

class AlbumPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            cancelToken: axios.CancelToken.source().token,
            album: null,
        }
    }

    componentDidMount() {
        axios.get(API.API_GET_ALBUM_BY_ID + this.props.viewContainer.data, {
            cancelToken: this.state.cancelToken
        }).then((response) => {
            this.setState({
                isLoaded: true,
                album: response.data,
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
        const { isLoaded, album, error } = this.state;
        if (isLoaded) {
            return (
                <div className="album-page">
                    <div className="header">
                        <div class="album-cover">
                            <img src={API.API_GET_ALBUM_BY_ID + this.state.album.id + "/cover"} />
                        </div>
                        <div class="album-info">
                            <h1 className="name">{this.state.album.name}</h1>
                            <h2 className="artist">by {this.state.album.artist}</h2>
                        </div>
                    </div>
                    <div className="content">
                        <div className="tracklist">
                            <TrackList />
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

export default connect(mapStateToProps, mapDispatchToProps)(AlbumPage);