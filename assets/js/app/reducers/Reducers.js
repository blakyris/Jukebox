import { combineReducers } from 'redux';

import PlayerReducer from './PlayerReducer';

const Reducers = combineReducers(
    {
        player: PlayerReducer
    }
);

export default Reducers;
