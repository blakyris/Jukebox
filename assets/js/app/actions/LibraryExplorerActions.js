import * as API from '../constants/ApiConstants'

export const LIBRARY_EXPLORER_CHANGED_VIEW = 'LIBRARY_EXPLORER_CHANGED_VIEW'
export const changeView = (view) => {
    return {
        type: LIBRARY_EXPLORER_CHANGED_VIEW,
        view: view,
    };
}

export const LIBRARY_FETCH_DATA = 'LIBRARY_FETCH_DATA'
export const fetchLibraryData = () => {
    return (dispatch) => {

        return Promise.all([
            fetch(API.API_GET_ALL_TRACKS),
            fetch(API.API_GET_ALL_ALBUMS),
            fetch(API.API_GET_ALL_ARTISTS),
        ]).then(([tracks, albums, artists]) => {
            return Promise.all([
                tracks.json(),
                albums.json(),
                artists.json()
            ]);
        }).then(([tracks, albums, artists]) => {
            let data = {
                tracks: tracks,
                albums: albums,
                artists: artists
            };
            dispatch(librarySuccessfullyLoaded(data));
        }).catch((error) => {
            console.error(error);
            dispatch(failedFetchData(error));
        });
    }
}

export const LIBRARY_SUCCESSFULLY_LOADED = 'LIBRARY_SUCCESSFULLY_LOADED'
export const librarySuccessfullyLoaded = (data) => {
    return ({
        type: LIBRARY_SUCCESSFULLY_LOADED,
        data: data,
    });
}

export const LIBRARY_FAILED_FETCH_DATA = 'LIBRARY_FAILED_FETCH_DATA'
export const failedFetchData = (error) => {
    return ({
        type: LIBRARY_FAILED_FETCH_DATA,
        error: error,
    });
}