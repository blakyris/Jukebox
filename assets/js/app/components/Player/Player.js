import React from 'react';

import ProgressBar from 'react-bootstrap/ProgressBar';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Howl, Howler } from 'howler';

import { faPlayCircle } from '@fortawesome/free-regular-svg-icons';
import { faBackward } from '@fortawesome/free-solid-svg-icons';
import { faForward } from '@fortawesome/free-solid-svg-icons';
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons';

const API_STREAM_TRACK = "http://127.0.0.1/api/stream/track/";

class Player extends React.Component {
  state = {};

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.setState({
      audio: new Howl({
        src: API_STREAM_TRACK + "5db967abdf077941924ff89d",
        html5: true
      })
    });
  }

  play() {
    this.state.audio.play();
  }

  render() {
    return (
      <div className="player w-100">
        <ProgressBar className="mx-auto w-100" now={80} />
        <div className="d-flex flex-row justify-content-between align-items-center p-2">

          <div className="d-flex flex-column track-info">
            <div><p>Track Name - Artist</p></div>
            <div><p>Album</p></div>
          </div>

          <ButtonToolbar className="d-flex justify-content-center my-2">
            <Button variant="link" className="player-btn mx-2">
              <FontAwesomeIcon icon={faBackward} />
            </Button>
            <Button onClick={this.play.bind(this)} variant="link" className="player-btn mx-2">
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
    
export default Player;