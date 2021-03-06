import axios from 'axios';

export const SONG = 'song';
export const ARTIST = 'artist';
export const ID = 'id';
export const ALBUM_ID = 'albumId';
export const TAG = 'tag';
export const COMMENT = 'comment';
export const ALBUM = 'album';
export const PLAYLISTS = 'playlists';
export const PLAYLIST = 'playlist';
export const PLAYLIST_NAME = 'playlistName';
export const ID_IN = 'id__in';
export const ARTIST_ID = 'artistId';
export const SONGS_FEED = 'songs-feed';
// TODO: aggregate under model obj

export const Models = {
    SONG,
    ARTIST,
    ID,
    TAG,
    COMMENT,
    ALBUM,
    PLAYLISTS,
    PLAYLIST,
};

export const Columns = {
    ID,
    ALBUM_ID,
    ID_IN,
    PLAYLIST_NAME,
    ARTIST_ID,
};

const API_BASE_URL = 'http://localhost:5000/api/';
// const API_BASE_URL = 'https://sm2qnqfpr4.execute-api.eu-west-1.amazonaws.com/dev/api/';

export function getWithCors(requestUrl) {
    return axios.get(requestUrl, { crossdomain: true });
}

export function postWithCors(requestUrl, dataToPost) {
    return axios.post(requestUrl, dataToPost);
}

export function getModelObjectsFromApi(modelName, filter) {
    let requestUrl = `${API_BASE_URL}${modelName}/`;

    if (filter) {
        requestUrl += `?${filter.filterColumn}=${filter.filterValue}`;
    }

    return getWithCors(requestUrl).then(response => {
        return response.data.objects;
    });
}

export function getRelatedModelBySongId(songId, modelName) {
    const requestUrl = `${API_BASE_URL}${modelName}/?songId__id=${songId}`;

    return getWithCors(requestUrl).then(response => {
        return response.data.objects;
    });
}

export function addComment(songId, commentContent, commentAuthorName) {
    let requestUrl = `${API_BASE_URL}${Models.COMMENT}/`;

    return postWithCors(requestUrl, {
        songId: songId,
        commentContent: commentContent,
        commentAuthorName: commentAuthorName
    });
}