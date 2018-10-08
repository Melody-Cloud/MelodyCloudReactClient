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
