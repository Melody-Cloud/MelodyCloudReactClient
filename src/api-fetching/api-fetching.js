import axios from 'axios';
import _ from 'lodash';

export const SONG = 'song';
export const ARTIST = 'artist';
export const ID = 'ID';
// TODO: aggregate under model obj

const API_BASE_URL = 'http://localhost:5000/api/';
// const API_BASE_URL = 'https://sm2qnqfpr4.execute-api.eu-west-1.amazonaws.com/dev/api/';

// const options = ;

export function fetchSongs() {
    // const requestUrl = `${API_BASE_URL}song`;
    const requestUrl = `https://sm2qnqfpr4.execute-api.eu-west-1.amazonaws.com/dev/api/tag/`;

    axios.get(requestUrl, { crossdomain: true }).then(response => {
        console.dir(response);
    });
}

export function getObjectsFromApi(modelName, filter) {
    let requestUrl = `${API_BASE_URL}${modelName}/`;

    if (filter) {
        requestUrl += `?${filter.filterColumn}=${filter.filterValue}`;
    }

    return axios.get(requestUrl, {crossdomain: true}).then(response => {
        return response.data.objects;
    });
}

export function getFullSongObjects() {
    return getObjectsFromApi(SONG).then(retrievedSongs => {
        let updatedSongs = _.map(retrievedSongs, song => {
            //{...song, artist: }
            return getObjectsFromApi(ARTIST, {filterColumn: ID, filterValue: song.artistId}).then(retrievedArtist => {
                return {...song, artist: retrievedArtist[0]};
            });
        });

        return Promise.all(updatedSongs);
    });
}