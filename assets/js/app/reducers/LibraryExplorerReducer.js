import * as LibraryExplorerActions from '../actions/LibraryExplorerActions';

const initialLibraryExplorerState = {
    view: 'tracks',
}

function LibraryExplorerReducer(state = initialLibraryExplorerState, action) {
    switch (action.type) {
        case LibraryExplorerActions.LIBRARY_EXPLORER_CHANGED_VIEW:
            return {
                ...state,
                view: action.view,
            };
        
        default:
            return {
                ...state,
            }
    }
}

export default LibraryExplorerReducer;