import React from 'react';

import { Icon } from 'react-icons-kit'
import {music_note_multiple} from 'react-icons-kit/linea/music_note_multiple';
import {music_playlist} from 'react-icons-kit/linea/music_playlist'

class Sidebar extends React.Component {

  render() {
    return (
      <div className="sidebar">
        <ul className="menu">
          <li className="button">
            <Icon icon={music_note_multiple} size={24} className="icon"/>
          </li>
        </ul>
      </div>
    );
  }

}

export default Sidebar;