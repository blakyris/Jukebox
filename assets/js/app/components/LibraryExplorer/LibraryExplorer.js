import React from 'react';
import ReactDOM from 'react-dom';
import AlbumGrid from './AlbumGrid';
import TrackList from './TrackList';

class LibraryExplorer extends React.Component {
  
  constructor(props) {
    super(props);
  }
  
  render() {
    return(
      <div className="d-flex flex-column flex-fill library-explorer">
        <div className="d-flex flex-column px-4 py-3 header">
          <h1>Library Explorer</h1>
        </div>
        <div className="d-flex flex-column m-0 p-0 content">
          <AlbumGrid />
          <TrackList />
        </div>
      </div>
    );
  }
  
}

export default LibraryExplorer;