import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Loading from '../../Utils/Loading';


class ArtistList extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        const { artists } = this.props;

        return (
            <div className="artist-list">
                {artists.map((artist) => (
                    <div key={artist.id} className="list-item" onClick={() => this.props.viewArtistPage(artist.id)}>
                        <div className="item-img" />
                        <div className="item-content">
                            <p>{artist.name}</p>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return state;
}

const mapDispatchToProps = (dispatch) => {
    return {

        viewArtistPage: (id) => {
            dispatch({
                type: "VIEW_ARTIST_PAGE",
                id: id,
            });
        },

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ArtistList);
