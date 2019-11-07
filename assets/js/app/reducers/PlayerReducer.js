import {
    PLAYER_PLAY_TRACK,
    PLAYER_NEXT_TRACK,
    PLAYER_PREV_TRACK,
} from '../actions/PlayerActions';


function PlayerReducer(state={}, action) {
    switch (action.type) {
        case PLAYER_PLAY_TRACK:
            return {
                trackId: action.trackId
            };
        default:
            return state;
    }
}

export default PlayerReducer;