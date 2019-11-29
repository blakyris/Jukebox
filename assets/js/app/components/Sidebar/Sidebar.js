import React from 'react';
import { connect } from 'react-redux';

import { Icon } from 'react-icons-kit'
import {music_note_multiple} from 'react-icons-kit/linea/music_note_multiple';
import {music_playlist} from 'react-icons-kit/linea/music_playlist'
import { timingSafeEqual } from 'crypto';

class Sidebar extends React.Component {

  render() {
    return (
      <div className="sidebar">
        <ul className="menu">
          <li className="button" onClick={() => { this.props.setLibraryView() }} >
            <Icon icon={music_note_multiple} size={24} className="icon"/>
          </li>
        </ul>
      </div>
    );
  }

}

const mapDispatchToProps = (dispatch) => {
  return {

    setLibraryView: () => {
      dispatch({ type: "VIEW_LIBRARY_EXPLORER" });
    },

  };
}

export default connect(null, mapDispatchToProps) (Sidebar);