import * as API from '../constants/ApiConstants';

import { Howl, Howler } from 'howler';


export const PLAYER_INITIALIZE = 'PLAYER_INITIALIZE'
export const initialize = (trackId) => {
    return {
        type: PLAYER_INITIALIZE,
    }
}

export const PLAYER_SET_TRACK = 'PLAYER_SET_TRACK'
export const setTrack = (track) => {
    return (dispatch, getState) => {

        const { player } = getState();
        if (player.audioObj && player.audioObj.state() != 'unloaded') {
            console.warn("Player needs to be unload.");
            dispatch({
                type: PLAYER_UNLOAD,
            });
        }

        dispatch({
            type: PLAYER_SET_TRACK,
            audioObj: new Howl({
                src: API.API_STREAM_TRACK + track.id,
                format: track.format,
                onload: () => {
                    dispatch({
                        type: PLAYER_PLAY_TRACK,
                    });
                },
                onloaderror: (id, error) => {
                    dispatch({
                        type: PLAYER_LOAD_ERROR,
                        error: error,
                    });
                },
            }),
            trackMetadata: track,
        });

    }
}

export const PLAYER_LOAD_SUCCESS = 'PLAYER_LOAD_SUCCESS'
export const loadSuccess = () => {
    return {
        type: PLAYER_LOAD_SUCCESS,
    }
}

export const PLAYER_LOAD_ERROR = 'PLAYER_LOAD_ERROR'
export const loadError = () => {
    return {
        type: PLAYER_LOAD_ERROR,
    }
}

export const PLAYER_PLAY_TRACK = 'PLAYER_PLAY_TRACK'
export const playTrack = () => {
    return {
        type: PLAYER_PLAY_TRACK,
    }
}

export const PLAYER_PAUSE_TRACK = 'PLAYER_PAUSE_TRACK'
export const pauseTrack = () => {
    return {
        type: PLAYER_PAUSE_TRACK,
    }
}

export const PLAYER_NEXT_TRACK = 'PLAYER_NEXT_TRACK'
export const nextTrack = (trackId) => ({
    type: PLAYER_NEXT_TRACK,
    trackId: trackId,
})

export const PLAYER_PREV_TRACK = 'PLAYER_PREV_TRACK'
export const previousTrack = (trackId) => ({
    type: PLAYER_PREV_TRACK,
    trackId: trackId,
})

export const PLAYER_SEEKED = 'PLAYER_SEEKED'
export const seek = () => {
    return {
        type: PLAYER_SEEKED,
    }
}

export const PLAYER_UNLOAD = 'PLAYER_UNLOAD'
export const unload = () => {
    return {
        type: PLAYER_UNLOAD,
    }
}