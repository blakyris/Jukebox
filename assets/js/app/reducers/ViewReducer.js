import * as ViewActions from '../actions/ViewActions';

const initialLibraryExplorerState = {
    view: 'LibraryExplorer',
}

function ViewReducer(state = initialLibraryExplorerState, action) {
    switch (action.type) {
        case ViewActions.VIEW_LIBRARY_EXPLORER:
            return {
                ...state,
                view: 'LibraryExplorer',
            };

        case ViewActions.VIEW_ALBUM:
            return {
                ...state,
                view: 'AlbumPage',
                data: action.id,
            };

        case ViewActions.VIEW_ARTIST_PAGE:
            return {
                ...state,
                view: 'ArtistPage',
                data: action.id,
            };

        default:
            return {
                ...state,
            }
    }
}

export default ViewReducer;