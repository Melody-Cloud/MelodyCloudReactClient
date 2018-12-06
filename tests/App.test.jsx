import {
    Button, Dimmer,
} from 'semantic-ui-react';
import { HashRouter } from 'react-router-dom';
import { mockListOfSongs, mockSong } from './mock-data/mock-songs';
import { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AppRouting from '../src/components/AppRouting';
import Enzyme from 'enzyme';
import Footer from '../src/components/pure-functional-components/Footer';
import MainScreen from '../src/components/main-components/MainScreen';
import Nav from '../src/components/pure-functional-components/Nav';
import React from 'react';
import ReactJkMusicPlayer from 'react-jinke-music-player';
import SongsFeed from '../src/components/SongsFeed';
import _ from 'lodash';

Enzyme.configure({ adapter: new Adapter() });

// MOCK
window.matchMedia = window.matchMedia || function() {
    return {
        matches : false,
        addListener : function() {},
        removeListener: function() {}
    };
};

describe('App', () => {
    it('Should render without crashing', () => {
        const app = mount(<AppRouting/>);
        expect(app.text()).toContain('MelodyCloud');
        app.unmount();
    });
});

describe('MainScreen', () => {
    it('Should always render music player', () => {
        const app = mount(<MainScreen/>);
        expect(app.find(ReactJkMusicPlayer).length).toEqual(1);
        app.unmount();
    });

    it('Should always contain a navigation element', () => {
        const app = mount(<MainScreen/>);
        expect(app.containsMatchingElement(<Nav/>)).toEqual(true);
        app.unmount();
    });

    it('Should always contain a footer element', () => {
        const app = mount(<MainScreen/>);
        expect(app.containsMatchingElement(<Footer/>)).toEqual(true);
        app.unmount();
    });
});

describe('Play button', () => {
    it('Should play a song after it is clicked', () => {
        const mockPlaySongInPlayer = jest.fn();

        const songsFeed = mount(<SongsFeed songsInFeed={[mockSong]} playSongInPlayer={mockPlaySongInPlayer}/>);
        songsFeed.find(Button).first().simulate('click');
        expect(mockPlaySongInPlayer).toHaveBeenCalled();
        songsFeed.unmount();
    });

    it('Should turn into pause button after click', () => {
        const icons = {
            play: 'play',
            pause: 'pause'
        };

        const songsFeed = mount(<SongsFeed songsInFeed={[mockSong]} playSongInPlayer={() => {
            songsFeed.setProps({
                musicPlayerRef: {current: {state: {audioLists: [mockSong]}}},
                songPlaying: true
            });
            songsFeed.update();
        }}/>);

        const playButton = songsFeed.find(Button).first();
        expect(playButton.prop('icon')).toEqual(icons.play);

        playButton.simulate('click');

        const rerenderedButton = songsFeed.find(Button).first();
        expect(rerenderedButton.prop('icon')).toEqual(icons.pause);

        songsFeed.unmount();
    });
});

describe('Songs Feed', () => {
    it('Should inform user when songs are being loaded from API', () => {

        const songsFeedWrapped = mount(
            <HashRouter>
                <SongsFeed areSongsLoadingFromApi={true}/>
            </HashRouter>);

        expect(songsFeedWrapped.find(Dimmer).prop('active')).toEqual(true);
        expect(songsFeedWrapped.text()).toContain('Loading new songs for you.');
    });

    it('Should close loading window and display all songs, once it received them from API', () => {
        const selectors = {
            listOfSongs: '#songs-feed',
            singleSongInList: 'div.single-song-item'
        };

        const songsFeedComponent = mount(
                <SongsFeed areSongsLoadingFromApi={false} songsInFeed={mockListOfSongs}/>);

        expect(songsFeedComponent.find(Dimmer).prop('active')).toEqual(false);

        expect(songsFeedComponent.exists(selectors.listOfSongs)).toEqual(true);
        const listOfSongsComponent = songsFeedComponent.find(selectors.listOfSongs);

        expect(listOfSongsComponent.find(selectors.singleSongInList).length).toEqual(mockListOfSongs.length);
    });

    it('Should display all the tags for songs', () => {
        const selectors = {
            listOfSongs: '#songs-feed',
            singleSongInList: 'div.single-song-item',
            tagsWrapper: 'div.song-tags-wrapper',
            singleTag: 'div.single-tag',
        };

        const songsFeedComponent = mount(
            <SongsFeed areSongsLoadingFromApi={false} songsInFeed={mockListOfSongs}/>);

        expect(songsFeedComponent.exists(selectors.listOfSongs)).toEqual(true);
        const listOfSongsComponent = songsFeedComponent.find(selectors.listOfSongs);

        const howManyTags = listOfSongsComponent.find(selectors.singleTag).length;

        const howManyTagsExpected = _.sumBy(mockListOfSongs, (mockSong) => { return mockSong.tags.length; });

        expect(howManyTags).toEqual(howManyTagsExpected);
    });

    it('Should display basic information about song in SongsFeed', () => {
        const selectors = {
            listOfSongs: '#songs-feed',
            singleSongInList: 'div.single-song-item',
            tagsWrapper: 'div.song-tags-wrapper',
            singleTag: 'div.single-tag',
        };

        const songsFeedComponent = mount(
            <SongsFeed areSongsLoadingFromApi={false} songsInFeed={[mockSong]}/>);

        const thingsToBeShowed = [
            mockSong.description,
            mockSong.artist.name,
            mockSong.name,
            mockSong.amountOfPlays,
            mockSong.amountOfLikes,
        ];

        thingsToBeShowed.forEach(thing => {
            expect(songsFeedComponent.text()).toContain(thing);
        });
    });
});