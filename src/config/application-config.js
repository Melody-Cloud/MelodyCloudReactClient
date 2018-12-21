import Notyf from 'notyf';

export const DEFAULT_PLAYER_VOLUME = 10;
export const WAVEFORM_IMAGE_WIDTH = 45; // MEASURED IN VW
export const WAVEFORM_IMAGE_HEIGHT = 133;
export const AESTHETICS_TIMEOUT = 1000;

export const INDEX_OF_FIRST_SONG_IN_PLAYLIST = 0;

export const notyf = new Notyf({
    delay: 2000,
});

export const HOW_MANY_SONGS_TO_DISPLAY_IN_PLAYLIST_PREVIEW = 2;

export const AMPLIFY_CONFIG = {
    Auth: {
        identityPoolId: 'eu-west-1:e1dd71be-5ad8-4b70-aee5-57692cfa2ab1', //REQUIRED - Amazon Cognito Identity Pool ID
        region: 'eu-west-1', // REQUIRED - Amazon Cognito Region
        userPoolId: 'eu-west-1_KKJMEabDC', //OPTIONAL - Amazon Cognito User Pool ID
        userPoolWebClientId: '4ji0pe7am9dnq9se5stgtslk5m', //OPTIONAL - Amazon Cognito Web Client ID
    },
    Storage: {
        bucket: 'melody-cloud-songs', //REQUIRED -  Amazon S3 bucket
        region: 'eu-west-1', //OPTIONAL -  Amazon service region
    },
};

export const availableColors = [
    'red',
    'orange',
    'yellow',
    'olive',
    'green',
    'teal',
    'blue',
    'violet',
    'purple',
    'pink',
    'brown',
    'grey',
    'black',
];