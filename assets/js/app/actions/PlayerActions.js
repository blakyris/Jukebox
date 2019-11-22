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
        let animationId = null;
        if (player.audioObj && player.audioObj.state() != 'unloaded') {
            dispatch({
                type: PLAYER_UNLOAD,
            });
        }

        dispatch({
            type: PLAYER_SET_TRACK,
            audioObj: new Howl({
                src: API.API_STREAM_TRACK + track.id,
                html5: true,
                preload: true,
                autoplay: true,
                format: track.format,
                volume: player.volume,
                onplay: () => {
                    dispatch({
                        type: PLAYER_STARTED_PLAYBACK,
                    });
                    animationId = setInterval(() => {
                        dispatch({
                            type: PLAYER_GET_SEEK_POS,
                        });
                    }, 500);
                    dispatch({
                        type: PLAYER_STARTED_SEEK_TRACKING,
                        animationId: animationId,
                    });
                },
                onload: () => {
                    dispatch({
                        type: PLAYER_LOAD_SUCCESS,
                    });
                },
                onloaderror: (id, error) => {
                    dispatch({
                        type: PLAYER_LOAD_ERROR,
                        error: error,
                    });
                },
                onend: () => {
                    dispatch(nextTrack());
                },
            }),
            trackMetadata: track,
            duration: track.duration,
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

export const PLAYER_STARTED_PLAYBACK = 'PLAYER_STARTED_PLAYBACK'
export const startedPlayback = () => {
    return {
        type: PLAYER_STARTED_PLAYBACK,
    }
}

export const PLAYER_PAUSE_TRACK = 'PLAYER_PAUSE_TRACK'
export const pauseTrack = () => {
    return {
        type: PLAYER_PAUSE_TRACK,
    }
}

export const PLAYER_NEXT_TRACK = 'PLAYER_NEXT_TRACK'
export const nextTrack = () => {
    return (dispatch, getState) => {
        const { playQueue, queuePos } = getState().player;

        if (queuePos < playQueue.length) {
            dispatch (setTrack(playQueue[queuePos + 1]));
            dispatch (setQueuePos(queuePos + 1));
        }
    }
}

export const PLAYER_PREV_TRACK = 'PLAYER_PREV_TRACK'
export const prevTrack = () => {
    return (dispatch, getState) => {
        const { playQueue, queuePos } = getState().player;

        if (queuePos > 0) {
            dispatch (setTrack(playQueue[queuePos - 1]));
            dispatch (setQueuePos(queuePos - 1));
        }
    }
}

export const PLAYER_SET_SEEK_POS = 'PLAYER_SET_SEEK_POS'
export const setSeek = (pos) => {
    return {
        type: PLAYER_SET_SEEK_POS,
        seekPos: pos
    }
}

export const PLAYER_GET_SEEK_POS = 'PLAYER_GET_SEEK_POS'
export const getSeekPos = () => {
    return {
        type: PLAYER_GET_SEEK_POS,
    }
}

export const PLAYER_STARTED_SEEK_TRACKING = 'PLAYER_STARTED_SEEK_TRACKING'
export const startedSeekTracking = (animationId) => {
    return {
        type: PLAYER_SET_VOLUME,
        animationId: animationId,
    }
}

export const PLAYER_SET_VOLUME = 'PLAYER_SET_VOLUME'
export const setVolume = (value) => {
    return {
        type: PLAYER_SET_VOLUME,
        volume: value
    }
}

export const PLAYER_SET_PLAY_QUEUE = 'PLAYER_SET_PLAY_QUEUE'
export const setPlayQueue = (queue) => {
    return {
        type: PLAYER_SET_PLAY_QUEUE,
        playQueue: queue || {},
    }
}

export const PLAYER_SET_QUEUE_POSITION = 'PLAYER_SET_QUEUE_POSITION'
export const setQueuePos = (pos) => {
    return {
        type: PLAYER_SET_QUEUE_POSITION,
        queuePos: pos,
    }
}

export const PLAYER_UNLOAD = 'PLAYER_UNLOAD'
export const unload = () => {
    return {
        type: PLAYER_UNLOAD,
    }
}