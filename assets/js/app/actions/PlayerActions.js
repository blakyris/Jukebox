import * as API from '../constants/ApiConstants';

import { Howl, Howler } from 'howler';


export const PLAYER_INITIALIZE = 'PLAYER_INITIALIZE'
export const initialize = (trackId) => {
    return {
        type: PLAYER_INITIALIZE,
    }
}

export const PLAYER_SET_TRACK = 'PLAYER_SET_TRACK'
export const setTrack = (trackId) => {
    return {
        type: PLAYER_SET_TRACK,
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