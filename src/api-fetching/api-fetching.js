import { getBarUrl, getCoverUrl, getSongMiniature } from '../utils/mocks';
import _ from 'lodash';
import axios from 'axios';

export const SONG = 'song';
export const ARTIST = 'artist';
export const ID = 'id';
export const TAG = 'tag';
export const COMMENT = 'comment';
// TODO: aggregate under model obj

const API_BASE_URL = 'http://localhost:5000/api/';
// const API_BASE_URL = 'https://sm2qnqfpr4.execute-api.eu-west-1.amazonaws.com/dev/api/';

// const options = ;

export function getWithCors(requestUrl) {
    return axios.get(requestUrl, { crossdomain: true });
}

export function fetchSongs() {
    // const requestUrl = `${API_BASE_URL}song`;
    const requestUrl = 'https://sm2qnqfpr4.execute-api.eu-west-1.amazonaws.com/dev/api/tag/';

    getWithCors(requestUrl).then(response => {
        console.dir(response);
    });
}

export function getObjectsFromApi(modelName, filter) {
    let requestUrl = `${API_BASE_URL}${modelName}/`;

    if (filter) {
        requestUrl += `?${filter.filterColumn}=${filter.filterValue}`;
    }

    return getWithCors(requestUrl).then(response => {
        return response.data.objects;
    });
}

export function getFullSongObjects() {
    return getObjectsFromApi(SONG).then(retrievedSongs => {
        let updatedSongs = _.map(retrievedSongs, song => {
            //{...song, artist: }
            return getObjectsFromApi(ARTIST, {filterColumn: ID, filterValue: song.artistId}).then(retrievedArtist => {
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

// export function getTagsBySongId(songId) {
//     const requestUrl = `${API_BASE_URL}${TAG}/?songId__id=${songId}`;
//
//     return getWithCors(requestUrl).then(response => {
//         return response.data.objects;
//     });
// }
//
// export function getCommentsBySongId(songId) {
//     const requestUrl = `${API_BASE_URL}${TAG}/?songId__id=${songId}`;
//
//     return getWithCors(requestUrl).then(response => {
//         return response.data.objects;
//     });
// }

export function getRelatedModelBySongId(songId, modelName) {
    const requestUrl = `${API_BASE_URL}${modelName}/?songId__id=${songId}`;

    return getWithCors(requestUrl).then(response => {
        return response.data.objects;
    });
}