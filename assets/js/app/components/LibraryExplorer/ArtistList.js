import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Loading from '../Utils/Loading';

import * as API from '../../constants/ApiConstants';

class ArtistList extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            cancelToken: axios.CancelToken.source().token,
            isLoaded: false,
            artists: {},
        };
    }

    componentDidMount() {
        axios.get(API.API_GET_ALL_ARTISTS, {
            cancelToken: this.state.cancelToken
        }).then((response) => {
            this.setState({
                isLoaded: true,
                artists: response.data,
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
        const { isLoaded, artists, error } = this.state;
        if (isLoaded) {
            if (error) {
                return (<div>Error</div>)
            } else {
                return (
                    <div className="artist-list">
                        {artists.map((artist) => (
                            <div key={artist.id} className="list-item">
                                <div className="item-img" />
                                <div className="item-content">
                                    <p>{artist.name}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                );
            }
        } else {
            return (<Loading />);
        }
    }

}

export default ArtistList;