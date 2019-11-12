import React from 'react';
import { connect } from 'react-redux';

import Nav from 'react-bootstrap/Nav';

import * as LibraryExplorerActions from '../../actions/LibraryExplorerActions';
import AlbumGrid from './AlbumGrid';
import TrackList from './TrackList';

class LibraryExplorer extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const view = this.props.libraryExplorer.view;
    let viewComponent;

    if (view == 'tracks') {
      viewComponent = <TrackList />;
    } else if (view == 'albums') {
      viewComponent = <AlbumGrid />;
    } else if (view == 'artists') {
      viewComponent = <div><p>Coming soon...</p></div>;
    } else {
      viewComponent = <div><p>An error occured during view rendering</p></div>;
    }


    return (
      <div className="d-flex flex-column flex-fill library-explorer">

        <div className="d-flex flex-column header">
          <h1 className="px-4 py-3">My Library</h1>
          <Nav className="justify-content-center view-selector" defaultActiveKey="trackView">
            <Nav.Item>
              <Nav.Link onSelect={() => { this.props.changeView('tracks') }} eventKey="trackView">Tracks</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onSelect={() => { this.props.changeView('albums') }} eventKey="albumView">Albums</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onSelect={() => { this.props.changeView('artists') }} eventKey="artistView">Artists</Nav.Link>
            </Nav.Item>
          </Nav>
        </div>

        <div className="d-flex flex-column m-0 p-0 content">
          {viewComponent}
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

    changeView: (view) => {
      dispatch(LibraryExplorerActions.changeView(view));
    },

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LibraryExplorer);