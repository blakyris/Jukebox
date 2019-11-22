// REACT + REDUX
import React from 'react';
import { connect } from 'react-redux';

// BOOTSTRAP
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

// FONTAWSOME
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle } from '@fortawesome/free-regular-svg-icons';
import { faPauseCircle } from '@fortawesome/free-regular-svg-icons';
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

  componentDidUpdate() {
    
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

  render() {
    return (
      <div className="player w-100">

        <Form className="m-0 p-0">
          <Form.Group className="m-0 p-0">
            <input value={this.props.player.seek}
              onChange={(e) => {
                this.props.setSeekPosAction(e.target.value);
              }}
              type="range"  min="0" step="1" max={this.props.player.duration} className="form-control-range p-0 m-0 range-slider seek-bar" />
          </Form.Group>
        </Form>
        
        <div className="d-flex flex-row justify-content-between align-items-center p-2">

          <div className="d-flex flex-column flex-fill noselect track-info">
            <div>
              <p className="title">{this.props.player.trackMetadata.title}</p>
            </div>
            <div className="d-flex flex-row flex-fill">
              <p className="artist">{this.props.player.trackMetadata.albumArtist}</p>
              <p>&nbsp; -  &nbsp;</p>
              <p className="album"> {this.props.player.trackMetadata.album}</p>
            </div>
          </div>  

          <ButtonToolbar className="d-flex flex-row flex-fill justify-content-center controls">
            <Button onClick={this.prevTrack.bind(this)} variant="link" className="player-btn mx-2">
              <FontAwesomeIcon icon={faBackward} />
            </Button>
            <Button onClick={this.playPause.bind(this)} variant="link" className="player-btn mx-2">
              <FontAwesomeIcon icon={this.props.player.isPlaying ? faPauseCircle : faPlayCircle} size="lg" />
            </Button>
            <Button onClick={this.nextTrack.bind(this)} variant="link" className="player-btn mx-2">
              <FontAwesomeIcon icon={faForward} />
            </Button>
          </ButtonToolbar>

          <div className="d-flex flex-fill align-items-center justify-content-end volume">
            <FontAwesomeIcon icon={faVolumeUp} size="sm" className="mr-2" />
            <Form className="m-0 p-0">
              <Form.Group className="m-0 p-0">
                <input defaultValue={this.props.player.volume * 100}
                  onChange={(e) => {
                    this.props.setVolumeAction(e.target.value);
                  }} 
                  type="range" className="form-control-range range-slider" />
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

    setVolumeAction: (value) => {
      dispatch(PlayerActions.setVolume(value));
    },

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Player);