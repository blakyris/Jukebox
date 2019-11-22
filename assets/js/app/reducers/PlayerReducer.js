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
    seekBarAnimationId: 0,
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
            };

        case PlayerActions.PLAYER_STARTED_PLAYBACK:
            return {
                ...state,
                isPlaying: true,
            };


        case PlayerActions.PLAYER_PAUSE_TRACK:
            clearInterval(state.seekBarAnimationId);
            state.audioObj.pause();
            return {
                ...state,
                isPlaying: false,
            };

        case PlayerActions.PLAYER_SET_SEEK_POS:
            if (state.isPlaying) {
                console.log(action.seekPos);
                state.audioObj.seek(action.seekPos);
            }
            return {
                ...state,
            };

        case PlayerActions.PLAYER_GET_SEEK_POS:
            if (state.isPlaying) {
                return {
                    ...state,
                    seek: Math.round(state.audioObj.seek() * 10) / 10,
                };
            } else {
                return {
                    ...state,
                    seek: 0,
                };
            }


        case PlayerActions.PLAYER_STARTED_SEEK_TRACKING:
            return {
                ...state,
                seekBarAnimationId: action.animationId,
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
            clearInterval(state.seekBarAnimationId);
            state.audioObj.off();
            state.audioObj.stop();
            state.audioObj.unload();
            return {
                ...state,
                audioObj: null,
                isPlaying: false,
                seek: 0,
                seekBarAnimationId: 0,
            };

        default:
            return {
                ...state,
            }
    }
}

export default PlayerReducer;