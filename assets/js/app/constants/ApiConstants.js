const API_ROOT = "http://localhost:8080/api/"

/* LIBRARY API */

export const API_GET_ALL_TRACKS = API_ROOT + "library/tracks";

export const API_GET_ALBUM_BY_ID = API_ROOT + "library/albums/";
export const API_GET_ALL_ALBUMS = API_ROOT + "library/albums";

export const API_GET_ALL_ARTISTS = API_ROOT + "library/artists";

/* STREAMING API */

export const API_STREAM_TRACK = API_ROOT + "stream/";