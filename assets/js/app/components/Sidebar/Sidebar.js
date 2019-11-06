import React from 'react';
import ReactDOM from 'react-dom';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faMusic } from '@fortawesome/free-solid-svg-icons';
import { faCompactDisc } from '@fortawesome/free-solid-svg-icons';
import { faUsers } from '@fortawesome/free-solid-svg-icons';

class Sidebar extends React.Component {

  render() {
    return (
      <div className="sidebar">
        <ul className="m-0 p-0">
          <li className="button p-3">
              <FontAwesomeIcon icon={faMusic} size="lg" />
          </li>
          <li className="button p-3"><FontAwesomeIcon icon={faCompactDisc} size="lg" /></li>
          <li className="button p-3"><FontAwesomeIcon icon={faUsers} size="lg" /></li>
        </ul>
      </div>
    );
  }

}

export default Sidebar;