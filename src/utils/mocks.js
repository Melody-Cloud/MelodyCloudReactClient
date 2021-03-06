import _ from 'lodash';
import faker from 'faker';

export function getBarUrl() {
    return `https://picsum.photos/400/50/?v=${getUiid()}`;
}

export function getCoverUrl() {
    return `https://picsum.photos/340/340/?v=${getUiid()}`;
}

function getAvatarUrl() {
    return `https://picsum.photos/240/240/?v=${getUiid()}`;
}

export function getSongMiniature() {
    return `https://picsum.photos/50/50/?v=${getUiid()}`;
}

export function getAlbumMiniature() {
    return `https://picsum.photos/100/100/?v=${getUiid()}`;
}

export function getPlaylistMiniature() {
    return `https://picsum.photos/50/50/?v=${getUiid()}`;
}

export function getAlbumCover() {
    return `https://picsum.photos/340/340/?v=${getUiid()}`;
}

export function getUiid() {
    return Math.random().toString(36).substring(7);
}

// const comments = [{'time': 1, 'content': 'A great song!!!!!!'}, {
//     'time': 3,
//     'content': 'I love the tune so much~~'
// }, {'time': 4, 'content': 'Love it!'}, {'time': 10, 'content': 'Shape of you, ooo~'}, {
//     'time': 17,
//     'content': 'Remix best!'
// }, {'time': 22, 'content': 'WOW, amazing!'}, {'time': 25, 'content': '~~~ XD ~~~'}, {
//     'time': 29,
//     'content': 'wakaka'
// }, {'time': 33, 'content': 'Let\'s do it!'}, {'time': 40, 'content': 'Good song!'}, {
//     'time': 45,
//     'content': '~__...OwO...__~'
// }];

// export const song1 = {
//     name: 'Song1', // song name
//     src: 'https://s0.vocaroo.com/media/download_temp/Vocaroo_s0FRiotFhFzX.mp3', // song source address
//     img: getBarUrl(),
//     comments: comments
// };
//
// export const song2 = {
//     name: 'Song2', // song name
//     src: 'https://s0.vocaroo.com/media/download_temp/Vocaroo_s01uFiNgRFGP.mp3', // song source address
//     img: getBarUrl(),
//     comments: comments
// };
//
// export const song3 = {
//     name: 'Song3', // song name
//     src: 'https://s1.vocaroo.com/media/download_temp/Vocaroo_s10KBi2dqEmz.mp3', // song source address
//     img: getBarUrl(),
//     comments: comments
// };
//
// export const song4 = {
//     name: 'Song4', // song name
//     src: 'https://s0.vocaroo.com/media/download_temp/Vocaroo_s0crYi8mrRBP.mp3', // song source address
//     img: getBarUrl(),
//     comments: comments
// };
//
// export const song5 = {
//     name: 'Song5', // song name
//     src: 'https://wenliangdai.github.io/src/songs/shape_of_you.mp3', // song source address
//     img: getBarUrl(),
//     comments: comments
// };

// export const mockedPlaylist = [song1, song2, song3, song4, song5];

export const getMockedAuthor = () => {
    return {
        name: faker.lorem.word(),
        avatar: getAvatarUrl(),
        artistDescription: faker.lorem.paragraphs(2)
    };
};

export const songNames = [
    'appetite',
    'cobain',
    'last_thing'
];

export const mockedUsers = [
    {
        name: 'Matt',
        avatarImgUrl: 'https://react.semantic-ui.com/images/avatar/small/matt.jpg',
    },
    {
        name: 'Elliot',
        avatarImgUrl: 'https://react.semantic-ui.com/images/avatar/small/elliot.jpg',
    },
    {
        name: 'Jenny',
        avatarImgUrl: 'https://react.semantic-ui.com/images/avatar/small/jenny.jpg',
    },
    {
        name: 'Joe',
        avatarImgUrl: 'https://react.semantic-ui.com/images/avatar/small/joe.jpg',
    }
];

export const userAvatars = [
    'https://react.semantic-ui.com/images/avatar/small/matt.jpg',
    'https://react.semantic-ui.com/images/avatar/small/elliot.jpg',
    'https://react.semantic-ui.com/images/avatar/small/jenny.jpg',
    'https://react.semantic-ui.com/images/avatar/small/joe.jpg'
];

export const mockedComments = [
    {
        content: 'How artistic!',
        author: mockedUsers[0],
        datetime: 'October 12, 2018 8:19PM'
    },
    {
        content: 'This has been very useful for my research. Thanks as well!',
        author: mockedUsers[1],
        datetime: 'August 12, 2018 8:19PM'
    },
    {
        content: 'Dude, this is awesome. Thanks so much',
        author: mockedUsers[2],
        datetime: 'July 2, 2018 8:19PM'
    }
];

export const jinkieMockSongs = _.map(songNames, (songName, index) => {
    const artistName = faker.lorem.word();

    return {
        id: index,
        name: songName,
        singer: artistName, // TODO: resolve confusion with singer name object
        artist: getMockedAuthor(),
        barImageUrl: getBarUrl(),
        musicSrc: `http://localhost:8081/music/${songName}.mp3`,
        waveformImgUrl: `http://localhost:8081/waveforms/${songName}.png`,
        amountOfPlays: index*100+100,
        amountOfLikes: index*20+15,
        cover: getCoverUrl(),
        comments: mockedComments,
        description: faker.lorem.paragraphs(2),
        tags: faker.lorem.words(3).split(' '),
        songMiniature: getSongMiniature(),
    }
});

const albumNames = [
    'Thraxxl Rose',
    'Hellboy',
    'Cry Baby',
];

export const getMockedAlbums = () => {
    return _.map(albumNames, albumName => {
        return {
            albumName: albumName,
            author: getMockedAuthor(),
            songsInAlbum: jinkieMockSongs,
            albumMiniature: getAlbumMiniature(),
            albumCover: getAlbumCover(),
        };
    });
};

export const getMockedPlaylists = () => {
    return _.map(_.range(10), () => {
        return {
            playlistName: faker.lorem.word(),
            playlistMiniature: getPlaylistMiniature(),
            songsInsidePlaylist: jinkieMockSongs,
        };
    });
};