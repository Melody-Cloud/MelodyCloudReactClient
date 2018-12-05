import { getBarUrl, getCoverUrl, getSongMiniature } from '../utils/mocks';
import _ from 'lodash';
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

// const options = ;

export function getWithCors(requestUrl) {
    return axios.get(requestUrl, { crossdomain: true });
}

// export function fetchSongs() {
//     // const requestUrl = `${API_BASE_URL}song`;
//     const requestUrl = 'https://sm2qnqfpr4.execute-api.eu-west-1.amazonaws.com/dev/api/tag/';
//
//     getWithCors(requestUrl).then(response => {
//         console.dir(response);
//     });
// }

export function getModelObjectsFromApi(modelName, filter) {
    let requestUrl = `${API_BASE_URL}${modelName}/`;

    if (filter) {
        requestUrl += `?${filter.filterColumn}=${filter.filterValue}`;
    }

    return getWithCors(requestUrl).then(response => {
        return response.data.objects;
    });
}

export function getFullSongObjects() {
    return getModelObjectsFromApi(SONG).then(retrievedSongs => {
        let updatedSongs = _.map(retrievedSongs, song => {
            //{...song, artist: }
            return getModelObjectsFromApi(ARTIST, {filterColumn: Columns.ID, filterValue: song.artistId}).then(retrievedArtist => {
                return {
                    ...song,
                    artist: retrievedArtist[0],
                    cover: getCoverUrl(), // TODO: remove this mock
                    barImageUrl: getBarUrl(),
                    songMiniature: getSongMiniature(),
                };
            });
        });

        return Promise.all(updatedSongs);
    });
}

export function getRelatedModelBySongId(songId, modelName) {
    const requestUrl = `${API_BASE_URL}${modelName}/?songId__id=${songId}`;

    return getWithCors(requestUrl).then(response => {
        return response.data.objects;
    });
}