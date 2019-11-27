

export const VIEW_LIBRARY_EXPLORER = 'VIEW_LIBRARY_EXPLORER'
export const viewLibraryExplorer = () => {
    return {
        type: VIEW_LIBRARY_EXPLORER,
    };
}

export const VIEW_ALBUM = 'VIEW_ALBUM'
export const viewAlbum = (id) => {
    return {
        type: VIEW_ALBUM,
        id: id,
    };
}