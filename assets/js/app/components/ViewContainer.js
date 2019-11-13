import React from 'react';

import LibraryExplorer from './LibraryExplorer/LibraryExplorer';
import TrackList from './LibraryExplorer/TrackList';

class ViewContainer extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="d-flex flex-column flex-fill view-container">
          <LibraryExplorer />
      </div>
    );
  }

}

export default ViewContainer;