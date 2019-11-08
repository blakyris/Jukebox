import * as PlayerActions from '../actions/PlayerActions';
import * as API from '../constants/ApiConstants';

import { Howl } from 'howler';


const initialPlayerState = {
    audioObj: null,
    src: {},
    playQueue: null,
    trackMetadata: {},
    isLoading: false,
    isPlaying: false,
}


function PlayerReducer(state = initialPlayerState, action) {
    switch (action.type) {

        case PlayerActions.PLAYER_INITIALIZE:
            return {
                ...state,
                audioObj: new Howl({
                    src: initialPlayerState.src,
                    html5: true,
                }),
            };

        case PlayerActions.PLAYER_REQUEST_TRACK:
            let url = API.API_STREAM_TRACK + action.trackId;
            state.audioObj.unload();
            let newAudio = new Howl({
                src: url,
                html5: true
            });
            return {
                ...state,
                src: url,
                audioObj: newAudio,
            };

        case PlayerActions.PLAYER_PLAY_TRACK:
            state.audioObj.play();
            return {
                ...state,
                isPlaying: true,
            };

        case PlayerActions.PLAYER_PAUSE_TRACK:
            state.audioObj.pause();
            return {
                ...state,
                isPlaying: false,
            }

        case PlayerActions.PLAYER_SET_METADATA:
            return {
                ...state,
                trackMetadata: action.trackMetadata,
            }

        default:
            return initialPlayerState;
    }
}

export default PlayerReducer;