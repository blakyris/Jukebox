import React from 'react';
import { connect } from 'react-redux';

import LibraryExplorer from './LibraryExplorer/LibraryExplorer';
import AlbumPage from './AlbumPage/AlbumPage';
import ArtistPage from './artist-page/artist-page';

class ViewContainer extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const view = this.props.viewContainer.view;
    let viewComponent;

    if (view == 'LibraryExplorer') {
      viewComponent =  <LibraryExplorer />;
    } else if (view == 'AlbumPage') {
      viewComponent = <AlbumPage />;
    } else if (view == 'ArtistPage') {
      viewComponent = <ArtistPage />;
    } else {
      viewComponent = <div><p>An error occured during view rendering</p></div>;
    }

    return (
      <div className="view-container">
          {viewComponent}
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return state;
}

const mapDispatchToProps = (dispatch) => {
  return {

    viewLibraryExplorer: () => {
      dispatch({ type: "VIEW_LIBRARY_EXPLORER" });
    },

  };
}

export default connect(mapStateToProps, mapDispatchToProps) (ViewContainer);