import * as PlayerActions from '../actions/PlayerActions';
import * as API from '../constants/ApiConstants';

import { dispatch } from 'redux'
import { Howl } from 'howler';


const initialPlayerState = {
    audioObj: null,
    trackMetadata: {},
    playQueue: null,
    queuePos: 0,
    duration: 0,
    seek: 0,
    volume: 1,
    isLoading: false,
    isPlaying: false,
}

function PlayerReducer(state = initialPlayerState, action) {
    switch (action.type) {
        
        case PlayerActions.PLAYER_SET_TRACK:
            return {
                ...state,
                audioObj: action.audioObj,
                trackMetadata: action.trackMetadata,
                duration: action.duration,
                isPlaying: true,
            };

        case PlayerActions.PLAYER_LOAD_SUCCESS:
            return {
                ...state,
                duration: Math.round(state.audioObj.duration()),
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

        case PlayerActions.PLAYER_SET_SEEK_POS:
            if (state.isPlaying)
                state.audioObj.seek(action.seekPos);
            return {
                ...state,
            };

        case PlayerActions.PLAYER_GET_SEEK_POS:
            return {
                ...state,
                seek: Math.round(state.audioObj.seek()),
            };

        case PlayerActions.PLAYER_SET_VOLUME:
            if (state.audioObj)
                state.audioObj.volume(action.volume / 100);
            return {
                ...state,
                volume: action.volume / 100,
            };

        case PlayerActions.PLAYER_SET_PLAY_QUEUE:
            return {
                ...state,
                playQueue: action.playQueue,
            };

        case PlayerActions.PLAYER_SET_QUEUE_POSITION:
            return {
                ...state,
                queuePos: action.queuePos,
            };

        case PlayerActions.PLAYER_UNLOAD:
            clearInterval();
            state.audioObj.off();
            state.audioObj.stop();
            state.audioObj.unload();
            state.audioObj = null;
            return {
                ...state,
                isPlaying: false,
            };

        default:
            return {
                ...state,
            }
    }
}

export default PlayerReducer;