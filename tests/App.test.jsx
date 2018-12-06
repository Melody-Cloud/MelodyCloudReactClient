import { mount } from 'enzyme';
import { testSong } from './__mocks__/testSongs';
import Adapter from 'enzyme-adapter-react-16';
import AppRouting from '../src/components/AppRouting';
import Enzyme from 'enzyme';
import Footer from '../src/components/pure-functional-components/Footer';
import MainScreen from '../src/components/main-components/MainScreen';
import Nav from '../src/components/pure-functional-components/Nav';
import React from 'react';
import SongsFeed from '../src/components/SongsFeed';
import ReactJkMusicPlayer from 'react-jinke-music-player';
import {
    Button,
} from 'semantic-ui-react';

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
    });
});

describe('MainScreen', () => {
    it('Should render music player', () => {
        const app = mount(<MainScreen/>);
        expect(app.find(ReactJkMusicPlayer).length).toEqual(1);
    });

    it('Should always contain a navigation element', () => {
        const app = mount(<MainScreen/>);
        expect(app.containsMatchingElement(<Nav/>)).toEqual(true);
    });

    it('Should always contain a footer element', () => {
        const app = mount(<MainScreen/>);
        expect(app.containsMatchingElement(<Footer/>)).toEqual(true);
    });
});

describe('Play button', () => {
    it('It should turn into pause button after click', () => {
        const classes = {
            play: 'play',
            pause: 'pause'
        };

        const app = mount(<SongsFeed songsInFeed={[testSong]} playSongInPlayer={() => {
            app.setProps({
                musicPlayerRef: {current: {state: {audioLists: [testSong]}}},
                songPlaying: true
            });
            app.update();
        }}/>);

        const playButton = app.find(Button).first();
        expect(playButton.prop('icon')).toEqual(classes.play);

        playButton.simulate('click');

        const rerenderedButton = app.find(Button).first();
        expect(rerenderedButton.prop('icon')).toEqual(classes.pause);
    });
});