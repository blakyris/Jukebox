export const PLAYER_SET_TRACK = 'PLAYER_SET_TRACK'
export const setTrack = (track) => {
    return {
        type: PLAYER_SET_TRACK,
        track: track,
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

export const PLAYER_IS_PLAYING = 'PLAYER_IS_PLAYING'
export const isPlaying = () => {
    return {
        type: PLAYER_IS_PLAYING,
    }
}

export const PLAYER_IS_PAUSED = 'PLAYER_IS_PAUSED'
export const isPaused = () => {
    return {
        type: PLAYER_IS_PAUSED,
    }
}

export const PLAYER_PLAYBACK_ERROR = 'PLAYER_PLAYBACK_ERROR'
export const playbackError = () => {
    return {
        type: PLAYER_PLAYBACK_ERROR,
    }
}

export const PLAYER_PAUSE_TRACK = 'PLAYER_PAUSE_TRACK'
export const pauseTrack = () => {
    return {
        type: PLAYER_PAUSE_TRACK,
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
export const setQueuePos = (position) => {
    return {
        type: PLAYER_SET_QUEUE_POSITION,
        queuePos: position,
    }
}

export const PLAYER_UNLOADED = 'PLAYER_UNLOADED'
export const unloaded = () => {
    return {
        type: PLAYER_UNLOADED,
    }
}

export const PLAYER_CLEAR_CURRENT_TRACK = 'PLAYER_CLEAR_CURRENT_TRACK'
export const clearCurrentTrack = () => {
    return {
        type: PLAYER_CLEAR_CURRENT_TRACK,
    }
}