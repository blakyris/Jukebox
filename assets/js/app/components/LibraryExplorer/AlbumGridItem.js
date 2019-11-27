import React from 'react';
import { connect } from 'react-redux';

import * as API from '../../constants/ApiConstants';

class AlbumGridItem extends React.Component {
  
  constructor(props) {
    super(props);
  }

  render() {
    const coverURI = API.API_GET_ALBUM_BY_ID + this.props.id + "/cover"

    return(
      <div className="item" onClick={() => {this.props.viewAlbum(this.props.id)}}>
          <div className="cover">
            <img src={coverURI} />
          </div>
          <div className="info noselect">
            <p className="name noselect">{this.props.name}</p>
            <p className="artist noselect">{this.props.artist}</p>
          </div>
      </div>
    );
  }
  
}

const mapStateToProps = (state) => {
  return state;
}

const mapDispatchToProps = (dispatch) => {
  return {

    viewAlbum: (id) => {
      dispatch({
        type: "VIEW_ALBUM",
        id: id,
      });
    },

  };
}

export default connect(mapStateToProps, mapDispatchToProps) (AlbumGridItem);