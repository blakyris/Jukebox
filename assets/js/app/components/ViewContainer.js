import React from 'react';

import LibraryExplorer from './LibraryExplorer/LibraryExplorer';
import TrackList from './LibraryExplorer/TrackList';

class ViewContainer extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="view-container">
          <LibraryExplorer></LibraryExplorer>
      </div>
    );
  }

}

export default ViewContainer;