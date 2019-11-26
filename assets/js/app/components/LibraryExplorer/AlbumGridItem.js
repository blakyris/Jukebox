import React from 'react';

import * as API from '../../constants/ApiConstants';

class LibraryExplorer extends React.Component {
  
  constructor(props) {
    super(props);
  }
  
  render() {
    const coverURI = API.API_GET_ALBUM_BY_ID + this.props.id + "/cover"
    /** */
    return(
      <div className="item">
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

export default LibraryExplorer;