import * as LibraryExplorerActions from '../actions/LibraryExplorerActions';

const initialLibraryExplorerState = {
    loaded: false,
    view: 'tracks',
    tracks: null,
    albums: null,
    artists: null,
}

function LibraryExplorerReducer(state = initialLibraryExplorerState, action) {
    switch (action.type) {
        case LibraryExplorerActions.LIBRARY_EXPLORER_CHANGED_VIEW:
            return {
                ...state,
                view: action.view,
            };
        
        case LibraryExplorerActions.LIBRARY_SUCCESSFULLY_LOADED:
            return {
                ...state,
                loaded: true,
                tracks: action.data.tracks,
                albums: action.data.albums,
                artists: action.data.artists,
            }

        case LibraryExplorerActions.LIBRARY_FAILED_FETCH_DATA:
            return {
                state,
                loaded: true,
                error: action.error,
            }
        
        default:
            return {
                ...state,
            }
    }
}

export default LibraryExplorerReducer;