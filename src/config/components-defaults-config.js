import { DEFAULT_PLAYER_VOLUME } from './application-config';

export const FIRST_COLUMN_PROPS = {
    mobile: 4,
    tablet: 3,
    computer: 3,
    largeScreen: 3,
    widescreen: 2,
};

export const SECOND_COLUMN_PROPS = {
    mobile: 2,
    tablet: 2,
    computer: 2,
    largeScreen: 2,
    widescreen: 2,
    className: 'play-button-column',
};

export const THIRD_COLUMN_PROPS = {
    mobile: 9,
    tablet: 8,
    computer: 8,
    largeScreen: 8,
    widescreen: 8,
    className: 'waveform-column',
};

export const FOURTH_COLUMN_PROPS = {
    mobile: 1,
    tablet: 3,
    computer: 3,
    largeScreen: 3,
    widescreen: 4,
};

export const JK_MUSIC_PLAYER_DEFAULT_SETTINGS = {
    preload: true,
    mode: 'full',
    defaultVolume: DEFAULT_PLAYER_VOLUME,
};

export const PLAY_BUTTON_PROPS = {
    className: 'play-button',
    icon: 'play',
    size: 'huge',
    color: 'green',
    circular: true,
    inverted: true,
};

export const MEDIUM_PLAY_BUTTON_PROPS = {
    ...PLAY_BUTTON_PROPS,
    className: '',
    size: 'medium',
};

export const PAUSE_BUTTON_PROPS = {
    className: 'play-button',
    icon: 'pause',
    size: 'huge',
    color: 'green',
    circular: true,
    inverted: true,
};

export const APPEND_TO_PLAYLIST_BUTTON_PROPS = {
    className: 'add-to-playlist-button',
    icon: 'plus',
    color: 'green',
    circular: true,
    inverted: true,
};

export const PLAY_ALBUM_BUTTON_PROPS = {
    className: 'play-album-button',
    size: 'huge',
    primary: true
};
