function getGenericImageUrl() {
    return `https://picsum.photos/400/50/?v=${getUiid()}`;
}
export function getUiid() {
    return Math.random().toString(36).substring(7);
}

const comments = [{"time": 1, "content": "A great song!!!!!!"}, {
    "time": 3,
    "content": "I love the tune so much~~"
}, {"time": 4, "content": "Love it!"}, {"time": 10, "content": "Shape of you, ooo~"}, {
    "time": 17,
    "content": "Remix best!"
}, {"time": 22, "content": "WOW, amazing!"}, {"time": 25, "content": "~~~ XD ~~~"}, {
    "time": 29,
    "content": "wakaka"
}, {"time": 33, "content": "Let's do it!"}, {"time": 40, "content": "Good song!"}, {
    "time": 45,
    "content": "~__...OwO...__~"
}];

export const song1 = {
    name: 'Song1', // song name
    src: 'https://s0.vocaroo.com/media/download_temp/Vocaroo_s0FRiotFhFzX.mp3', // song source address
    img: getGenericImageUrl(),
    comments: comments
};

export const song2 = {
    name: 'Song2', // song name
    src: 'https://s0.vocaroo.com/media/download_temp/Vocaroo_s01uFiNgRFGP.mp3', // song source address
    img: getGenericImageUrl(),
    comments: comments
};

export const song3 = {
    name: 'Song3', // song name
    src: 'https://s1.vocaroo.com/media/download_temp/Vocaroo_s10KBi2dqEmz.mp3', // song source address
    img: getGenericImageUrl(),
    comments: comments
};

export const song4 = {
    name: 'Song4', // song name
    src: 'https://s0.vocaroo.com/media/download_temp/Vocaroo_s0crYi8mrRBP.mp3', // song source address
    img: getGenericImageUrl(),
    comments: comments
};

export const song5 = {
    name: 'Song5', // song name
    src: 'https://wenliangdai.github.io/src/songs/shape_of_you.mp3', // song source address
    img: getGenericImageUrl(),
    comments: comments
};

export const mockedPlaylist = [song1, song2, song3, song4, song5];


// export const jinkieMockSongs = [
//     {
//         name: "Song1",
//         singer: "Singer1",
//         cover: getGenericImageUrl(),
//         musicSrc: "https://s0.vocaroo.com/media/download_temp/Vocaroo_s01uFiNgRFGP.mp3",
//         id: 1
//     },
//     {
//         name: "Song2",
//         singer: "Song2",
//         cover: getGenericImageUrl(),
//         musicSrc: "https://s0.vocaroo.com/media/download_temp/Vocaroo_s0crYi8mrRBP.mp3",
//         id: 2
//     }
// ];

export const songNames = [
    'appetite',
    'cobain',
    'last_thing'
];

export const jinkieMockSongs = _.map(songNames, (songName, index) => {
    return {
        id: index,
        name: songName,
        singer: `Singer${index}`,
        cover: getGenericImageUrl(),
        musicSrc: `http://localhost:8081/music/${songName}.mp3`,
        waveform: `http://localhost:8081/waveforms/${songName}.png`,
        amountOfPlays: index*100+100,
        amountOfLikes: index*20+15
    }
});