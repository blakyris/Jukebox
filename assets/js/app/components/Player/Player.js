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
import * as API from '../../constants/ApiConstants';

class Player extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      player: null,
      seekPos: 0,
      seekInterval: null,
      volume: 1,
      duration: 1,
      inputValue: 0,
    }
    this.seekTimer = null;
  }

  componentDidMount() {

  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    if (this.props.player.currentTrack) {
      if (this.props.player.currentTrack != prevProps.player.currentTrack) {
        this.setTrack(this.props.player.currentTrack);
      }
    }

    return null;
  }

  componentDidUpdate() {

  }

  setTrack(track) {
    if (this.props.player.isPlaying) {
      this.unload();
    }

    this.setState({
      player: new Howl({
        src: API.API_STREAM_TRACK + track.id,
        html5: true,
        preload: true,
        autoplay: true,
        format: track.format,
        volume: this.state.volume,
        onload: () => {
          this.props.loadedSuccessfully();
        },
        onloaderror: (id, error) => {
          this.unlock();
          this.props.loadError();
        },
        onplay: () => {
          this.postPlayTasks();
          this.props.isPlaying();
        },
        onplayerror: (id, error) => {
          console.log("Play error : ", error);
        },
        onpause: () => {
          clearInterval(this.seekTimer);
          this.props.isPaused();
        },
        onend: () => {
          this.nextTrack();
        },
      }),
    });

  }

  unlock() {
    this.state.player.once('unlock', function() {
      this.play();
    });
  }

  play() {
    this.state.player.play();
  }

  postPlayTasks() {
    this.setState({
      ...this.state,
      duration: this.state.player.duration(),
    })
    this.seekTimer = setInterval(() => {
      this.setState({
        ...this.state,
        seekPos: this.state.player.seek(),
      });
    }, 200);
  }

  pause() {
    this.state.player.pause();
  }

  nextTrack() {
    const { playQueue, queuePos } = this.props.player;

    if (queuePos < playQueue.length - 1) {
      this.props.setTrack(playQueue[queuePos + 1]);
      this.props.setQueuePosition(queuePos + 1);
    } else {
      if (this.state.player)
        this.unload();
        this.props.clearCurrentTrack();
    }
  }

  previousTrack() {
    const { playQueue, queuePos } = this.props.player;

    if (queuePos > 0) {
      this.props.setTrack(playQueue[queuePos - 1]);
      this.props.setQueuePosition(queuePos - 1);
    } else {
      if (this.state.player) {
        this.unload();
        this.props.clearCurrentTrack();
      }
    }
  }

  seek(position) {
    if (this.props.player.isPlaying) {
      this.state.player.seek(position);
    }
  }

  setVolume(value) {
    if (value >= 0 && value <= 100) {
      this.state.player.volume(value / 100);
    }
  }

  unload() {
    clearInterval(this.seekTimer);
    this.state.player.off();
    this.state.player.stop();
    this.state.player.unload();
    this.setState({ ...this.state, player: null, seekPos: 0 });
    this.props.unloaded();
  }

  render() {
    const { currentTrack } = this.props.player;

    return (
      <div className="player">

        <Form className="seek-bar-container">
          <Form.Group>
            <input value={this.state.seekPos}
              onChange={(e) => {
                this.setState({
                  ...this.state,
                  inputValue: Math.fround(e.target.value),
                })
              }}
              onMouseUp={(e) => {
                this.seek(this.state.inputValue);
              }}
              type="range" min="0" step="any" max={this.state.duration}
              className="form-control-range player-slider seek-bar" />
          </Form.Group>
        </Form>

        <div className="player-bar">

          <div className="player-col-left">
            <div className="track-info noselect">
              <div>
                <p className="title">{currentTrack && currentTrack.title ? currentTrack.title : ""}</p>
                <p className="artist">{currentTrack && currentTrack.title ? currentTrack.albumArtist : ""}</p>
              </div>
            </div>
          </div>

          <div className="player-col-middle">
            <ButtonToolbar className="controls">
              <Button onClick={() => { this.previousTrack() }} variant="link" className="player-btn mx-2">
                <FontAwesomeIcon icon={faBackward} />
              </Button>
              <Button onClick={() => { 
                if (this.props.player.isPlaying) { this.pause() }
                else { this.play() }
               }} variant="link" className="player-btn mx-2">
                <FontAwesomeIcon icon={this.props.player.isPlaying ? faPauseCircle : faPlayCircle} size="lg" />
              </Button>
              <Button onClick={() => { this.nextTrack() }} variant="link" className="player-btn mx-2">
                <FontAwesomeIcon icon={faForward} />
              </Button>
            </ButtonToolbar>
          </div>


          <div className="player-col-right">
            <div className="volume-control">
              <FontAwesomeIcon icon={faVolumeUp} size="sm" className="icon" />
              <Form className="">
                <Form.Group className="">
                  <input defaultValue={100}
                    onInput={(e) => { this.setVolume(e.target.value) }}
                    type="range" className="form-control-range player-slider" />
                </Form.Group>
              </Form>
            </div>
          </div>

        </div>

      </div>
    );
  }

  componentWillUnmount() {
    clearInterval(this.seekTimer);
  }

}

const mapStateToProps = (state) => {
  return state;
}

const mapDispatchToProps = (dispatch) => {
  return {

    setTrack: (track) => {
      dispatch({ type: "PLAYER_SET_TRACK", track: track });
    },

    loadedSuccessfully: () => {
      dispatch({ type: "PLAYER_LOADED_SUCCESSFULLY" });
    },

    loadError: () => {
      dispatch({ type: "PLAYER_LOAD_ERROR" });
    },

    isPlaying: () => {
      dispatch({ type: "PLAYER_IS_PLAYING" });
    },

    isPaused: () => {
      dispatch({ type: "PLAYER_IS_PAUSED" });
    },

    playbackError: () => {
      dispatch({ type: "PLAYER_PLAYBACK_ERROR" });
    },

    setQueuePosition: (position) => {
      dispatch({ type: "PLAYER_SET_QUEUE_POSITION", queuePos: position });
    },

    clearCurrentTrack: () => {
      dispatch({ type: "PLAYER_CLEAR_CURRENT_TRACK" });
    },

    unloaded: () => {
      dispatch({ type: "PLAYER_UNLOADED" });
    }

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Player);