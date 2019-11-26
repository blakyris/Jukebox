import React from 'react';
import axios from 'axios';

import AlbumGridItem from './AlbumGridItem';
import * as API from '../../constants/ApiConstants';
import Loading from '../Utils/Loading';

class AlbumGrid extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            cancelToken: axios.CancelToken.source().token,
            albums: []
        }
    }

    componentDidMount() {
        axios.get(API.API_GET_ALL_ALBUMS, {
            cancelToken: this.state.cancelToken
        }).then((response) => {
            this.setState({
                isLoaded: true,
                albums: response.data,
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
        const { isLoaded, albums, error } = this.state;

        if (isLoaded) {
            if (error)
                return (
                    <div>{error}</div>
                );
            else {
                return (
                    <div className="album-grid">
                        <div className="grid-content">
                            {albums.map((album) => (
                                <AlbumGridItem key={album.id} id={album.id} name={album.name} artist={album.artist} />
                            ))}
                        </div>
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

export default AlbumGrid;