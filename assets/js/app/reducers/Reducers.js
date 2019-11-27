import { combineReducers } from 'redux';

import ViewReducer from './ViewReducer';
import PlayerReducer from './PlayerReducer';
import LibraryExplorerReducer from './LibraryExplorerReducer';


const Reducers = combineReducers(
    {
        viewContainer: ViewReducer,
        libraryExplorer: LibraryExplorerReducer,
        player: PlayerReducer,
    }
);

export default Reducers;