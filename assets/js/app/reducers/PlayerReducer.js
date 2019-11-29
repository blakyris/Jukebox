import * as Actions from '../actions/PlayerActions';

import { dispatch } from 'redux'
import { Howl } from 'howler';


const initialPlayerState = {
    isPlaying: false,
    hasLoaded: false,
    currentTrack: null,
    playQueue: null,
    queuePos: null,
}

function PlayerReducer(state = initialPlayerState, action) {
    switch (action.type) {

        case Actions.PLAYER_SET_TRACK:
            return ({
                ...state,
                currentTrack: action.track,
            });

        case Actions.PLAYER_LOAD_SUCCESS:
            return ({
                ...state,
                hasLoaded: true,
            });

        case Actions.PLAYER_LOAD_ERROR:
            return ({
                ...state,
                hasLoaded: false,
            });

        case Actions.PLAYER_PLAY_TRACK:
            return ({
                ...state,
            });

        case Actions.PLAYER_IS_PLAYING:
            return ({
                ...state,
                isPlaying: true,
            });

        case Actions.PLAYER_IS_PAUSED:
            return ({
                ...state,
                isPlaying: false,
            });

        case Actions.PLAYER_PAUSE_TRACK:
            return ({
                ...state,
                isPlaying: false,
            });

        case Actions.PLAYER_SET_PLAY_QUEUE:
            return ({
                ...state,
                playQueue: action.playQueue,
            });

        case Actions.PLAYER_SET_QUEUE_POSITION:
            return ({
                ...state,
                queuePos: action.queuePos,
            });

        case Actions.PLAYER_UNLOADED:
            return ({
                ...state,
                isPlaying: false,
                hasLoaded: false,
            });

        case Actions.PLAYER_CLEAR_CURRENT_TRACK:
            return ({
                ...state,
                currentTrack: null,
            });

        default:
            return {
                ...state,
            }
    }
}

export default PlayerReducer;