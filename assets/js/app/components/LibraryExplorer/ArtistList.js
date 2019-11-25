import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Loading from '../Utils/Loading';

import * as API from '../../constants/ApiConstants';

class ArtistList extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            isLoaded: false,
            artists: {},
        };
    }

    componentDidMount() {
        axios.get(API.API_GET_ALL_ARTISTS)
            .then((response) => {
                this.setState({
                    isLoaded: true,
                    artists: response.data,
                });
            })
            .catch((error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            });
    }

    render() {
        const { isLoaded, artists, error } = this.state;
        if (isLoaded) {
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
        } else {
            return (<Loading />);
        }

    }

}

export default ArtistList;