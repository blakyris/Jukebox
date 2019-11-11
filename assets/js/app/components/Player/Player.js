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
import * as API from '../../constants/ApiConstants';
import * as PlayerActions from '../../actions/PlayerActions';

class Player extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  componentDidUpdate() {
    if (this.props.player.isPlaying) {
      setInterval(() => {
        this.props.getSeekPosAction();
      }, 1000);
    } else {
      clearInterval();
    }
  }

  playPause() {
    if (!this.props.player.isPlaying) {
      if (this.props.player.audioObj.state() != 'unloaded')
        this.props.playAction();
    } else {
      this.props.pauseAction();
    }
  }

  prevTrack() {
    this.props.prevAction();
  }

  nextTrack() {
    this.props.nextAction();
  }

  unload() {

  }

  getProgressValue() {
    if (this.props.player.isPlaying) {
      return ((this.props.player.seek / this.props.player.duration) * 100);
    } else return 0;
  }

  render() {
    return (
      <div className="player w-100">
        <Form className="m-0 p-0">
          <Form.Group className="m-0 p-0">
            <input value={this.getProgressValue()} 
            onChange={(e) => {
              this.props.setSeekPosAction(Math.round((e.target.value / 100) * this.props.player.duration));
            }} 
            type="range" className="form-control-range seek-bar" />
          </Form.Group>
        </Form>
        <div className="d-flex flex-row justify-content-between align-items-center p-2">

          <div className="d-flex flex-column track-info">
            <div><p>{this.props.player.trackMetadata.title}</p></div>
            <div><p>{this.props.player.trackMetadata.albumArtist} - {this.props.player.trackMetadata.album}</p></div>
          </div>

          <ButtonToolbar className="d-flex justify-content-center my-2">
            <Button onClick={this.prevTrack.bind(this)} variant="link" className="player-btn mx-2">
              <FontAwesomeIcon icon={faBackward} />
            </Button>
            <Button onClick={this.playPause.bind(this)} variant="link" className="player-btn mx-2">
              <FontAwesomeIcon icon={faPlayCircle} size="lg" />
            </Button>
            <Button onClick={this.nextTrack.bind(this)} variant="link" className="player-btn mx-2">
              <FontAwesomeIcon icon={faForward} />
            </Button>
          </ButtonToolbar>

          <div className="d-flex align-items-center volume-control">
            <FontAwesomeIcon icon={faVolumeUp} size="sm" className="mr-2" />
            <Form className="m-0 p-0">
              <Form.Group className="m-0 p-0">
                <input defaultValue={this.props.player.volume} type="range" className="form-control-range" />
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

    setAction: (track) => {
      dispatch({
        type: 'PLAYER_SET_TRACK',
        track: track
      })
    },

    playAction: () => {
      dispatch({
        type: 'PLAYER_PLAY_TRACK',
      })
    },

    pauseAction: () => {
      dispatch({
        type: 'PLAYER_PAUSE_TRACK',
      })
    },

    nextAction: () => {
      dispatch(PlayerActions.nextTrack());
    },

    prevAction: () => {
      dispatch(PlayerActions.prevTrack());
    },

    setSeekPosAction: (pos) => {
      dispatch(PlayerActions.setSeek(pos));
    },

    getSeekPosAction: () => {
      dispatch(PlayerActions.getSeekPos());
    },

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Player);