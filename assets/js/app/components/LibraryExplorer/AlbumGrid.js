import React from 'react';
import AlbumGridItem from './AlbumGridItem';

const API_GET_ALBUM = "http://127.0.0.1/api/library/albums/get/all";

class AlbumGrid extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            albums: []
        }
    }

    componentDidMount() {
        fetch(API_GET_ALBUM)
            .then(response => response.json())
            .then(
                (data) => {
                    this.setState({
                        isLoaded: true,
                        albums: data
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

    render() {
        const { isLoaded, albums, error } = this.state;

        if (isLoaded) {
            if (error)
                return (
                    <div>{error}</div>
                );
            else {
                albums.forEach(album => {
                    console.log(album);
                });
                return (
                    <div className="d-flex flex-column flex-fill flex-wrap album-grid">
                        <div className="d-flex flex-row flex-wrap">
                            {albums.map((album) => (
                                <AlbumGridItem key={album.id} name={album.name} artist={album.artist} />
                            ))}
                        </div>
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

export default AlbumGrid;