import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import Nav from 'react-bootstrap/Nav';

import * as API from '../../constants/ApiConstants'

import * as LibraryExplorerActions from '../../actions/LibraryExplorerActions';
import AlbumGrid from './AlbumGrid';
import TrackList from './TrackList';
import ArtistList from './ArtistList';
import Loading from '../Utils/Loading';

class LibraryExplorer extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchData();
  }

  componentDidUpdate() {

  }

  componentWillUnmount() {

  }

  setContentView() {
    if (this.props.libraryExplorer.loaded) {
      if (this.props.libraryExplorer.error) {
        return <p>Error while loading library</p>;
      } else {
        const view = this.props.libraryExplorer.view;
        switch (view) {
          case 'tracks': return <TrackList tracks={this.props.libraryExplorer.tracks} />;
          case 'albums': return <AlbumGrid />;
          case 'artists': return <ArtistList />;
          default: return <div>Nothing to show here</div>;
        }
      }
    } else {
      return <Loading />;
    }
  }

  render() {
    const view = this.setContentView();

    return (
      <div className="library-explorer">

        <div className="header">
          <h1 className="px-4 py-3 noselect">My Library</h1>
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

        <div className="content">
           {view}
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

    fetchData: () => {
      dispatch(LibraryExplorerActions.fetchLibraryData());
    },

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LibraryExplorer);