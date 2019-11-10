import * as PlayerActions from '../actions/PlayerActions';
import * as API from '../constants/ApiConstants';

import { dispatch } from 'redux'
import { Howl } from 'howler';


const initialPlayerState = {
    audioObj: null,
    playingId: null,
    src: {},
    playQueue: null,
    trackMetadata: {},
    seek: 0,
    isLoading: false,
    isPlaying: false,
}


function PlayerReducer(state, action) {
    switch (action.type) {

        case PlayerActions.PLAYER_SET_TRACK:
            return {
                ...state,
                audioObj: action.audioObj,
                trackMetadata: action.trackMetadata,
            };

        case PlayerActions.PLAYER_LOAD_ERROR:
            console.error("Player error while loading track : " + action.error);
            return {
                ...state,
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
            };

        case PlayerActions.PLAYER_UNLOAD:
            state.audioObj.unload();
            return initialPlayerState;

        default:
            console.warn("Called default state.");
            return initialPlayerState;
    }
}

export default PlayerReducer;   