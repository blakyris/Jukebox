import { combineReducers } from 'redux';

import PlayerReducer from './PlayerReducer';
import LibraryExplorerReducer from './LibraryExplorerReducer';

const Reducers = combineReducers(
    {
        libraryExplorer: LibraryExplorerReducer,
        player: PlayerReducer,
    }
);

export default Reducers;