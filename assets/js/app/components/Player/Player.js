
// REACT + REDUX
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Howl, Howler } from 'howler';

// BOOTSTRAP
import ProgressBar from 'react-bootstrap/ProgressBar';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

// FONTAWSOME
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle } from '@fortawesome/free-regular-svg-icons';
import { faBackward } from '@fortawesome/free-solid-svg-icons';
import { faForward } from '@fortawesome/free-solid-svg-icons';
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons';

// APP MODULES
import * as PlayerActions from '../../actions/PlayerActions';

class Player extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {
    console.log(this.props);
    return (
      <div className="player w-100">
        <ProgressBar className="mx-auto w-100" now={80} />
        <div className="d-flex flex-row justify-content-between align-items-center p-2">

          <div className="d-flex flex-column track-info">
            <div><p>{this.props.player.trackId}</p></div>
            <div><p>Album</p></div>
          </div>

          <ButtonToolbar className="d-flex justify-content-center my-2">
            <Button variant="link" className="player-btn mx-2">
              <FontAwesomeIcon icon={faBackward} />
            </Button>
            <Button onClick={() => this.props.playTrack("5db967abdf077941924ff89d")} variant="link" className="player-btn mx-2">
              <FontAwesomeIcon icon={faPlayCircle} size="lg" />
            </Button>
            <Button variant="link" className="player-btn mx-2">
              <FontAwesomeIcon icon={faForward} />
            </Button>
          </ButtonToolbar>

          <div className="d-flex align-items-center volume-control">
            <FontAwesomeIcon icon={faVolumeUp} size="sm" className="mr-2" />
            <Form className="m-0 p-0">
              <Form.Group className="m-0 p-0">
                <input type="range" className="form-control-range" />
              </Form.Group>
            </Form>
          </div>

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
      playTrack: (id) => { dispatch({type: 'PLAYER_PLAY_TRACK', trackId: id}) }
  };
}

export default connect(mapStateToProps, mapDispatchToProps) (Player);