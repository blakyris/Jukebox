import * as PlayerActions from '../actions/PlayerActions';
import * as API from '../constants/ApiConstants';

import { dispatch } from 'redux'
import { Howl } from 'howler';


const initialPlayerState = {
    audioObj: new Howl({src: {}}),
    src: {},
    playQueue: null,
    trackMetadata: {},
    seek: 0,
    isLoading: false,
    isPlaying: false,
}


function PlayerReducer(state = initialPlayerState, action) {
    switch (action.type) {

        case PlayerActions.PLAYER_SET_TRACK:
            if (state.audioObj.state() != 'unloaded')
                state.audioObj.unload();
            return {
                ...state,
                audioObj: new Howl({
                    src: API.API_STREAM_TRACK + action.trackId,
                    html5: true,
                    preload: true,
                    onload: () => {
                        console.log("Track loaded succesfully.");
                    },
                    onloaderror: (id, err) => {
                        console.error("Load Error : " + err);
                    }
                }),
                trackMetadata: action.trackMetadata
            };

        case PlayerActions.PLAYER_PLAY_TRACK:
            state.audioObj.play();
            console.log("Track Duration : " + state.audioObj.duration());
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

        default:
            return initialPlayerState;
    }
}

export default PlayerReducer;