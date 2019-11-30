import React from 'react';
import axios from 'axios';

import AlbumGridItem from './album-grid-item';

class AlbumGrid extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        const { albums } = this.props;

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

}

export default AlbumGrid;