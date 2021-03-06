import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import Nav from 'react-bootstrap/Nav';

import * as API from '../../constants/ApiConstants'

import * as LibraryExplorerActions from '../../actions/LibraryExplorerActions';
import TrackList from '../reusables/tracklist/tracklist';
import AlbumGrid from '../reusables/album-grid/album-grid';
import ArtistList from '../reusables/artist-list/artist-list';
import Loading from '../Utils/Loading';

class LibraryExplorer extends React.Component {

  constructor(props) {
    super(props);
    this.defaultView = "trackView";
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
        const { view } = this.props.libraryExplorer;
        switch (view) {
          case 'tracks': return <TrackList tracks={this.props.libraryExplorer.tracks} />;
          case 'albums': return <AlbumGrid albums={this.props.libraryExplorer.albums} />;
          case 'artists': return <ArtistList artists={this.props.libraryExplorer.artists} />;
          default: return null;
        }
      }
    } else {
      return <Loading />;
    }
  }

  render() {
    const { view } = this.props.libraryExplorer;
    const contentView = this.setContentView();

    return (
      <div className="library-explorer">

        <div className="header">
          <h1 className="px-4 py-3 noselect">My Library</h1>
          <Nav className="justify-content-center view-selector" defaultActiveKey={view}>
            <Nav.Item>
              <Nav.Link onSelect={() => { this.props.changeView('tracks') }} eventKey="tracks">Tracks</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onSelect={() => { this.props.changeView('albums') }} eventKey="albums">Albums</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onSelect={() => { this.props.changeView('artists') }} eventKey="artists">Artists</Nav.Link>
            </Nav.Item>
          </Nav>
        </div>

        <div className="content">
           {contentView}
        </div>

      </div>
    );
  }

  componentWillUnmount() {

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