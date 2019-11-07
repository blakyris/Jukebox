import * as API from '../constants/ApiConstants';

import { Howl, Howler } from 'howler';


export const PLAYER_REQUEST_TRACK = 'PLAYER_REQUEST_TRACK'
export const requestTrack = (trackId) => (
{
    type: PLAYER_REQUEST_TRACK,
    trackId: trackId,
})

export const PLAYER_PLAY_TRACK = 'PLAYER_PLAY_TRACK'
export const playTrack = (trackId) => {
    return {
        type: PLAYER_PLAY_TRACK,
        trackId: trackId,
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

/*
function fetchTrack(id) {
    return dispatch => {
        dispatch(requestTrack(id))
        return dispatch(receivePosts(id, new Howl({
            src: API.API_STREAM_TRACK + id,
            html5: true
        })))
    };
}
*/