import 'assets/scss/MainScreen.scss';
import 'react-jinke-music-player/assets/index.css';

import _ from 'lodash';

import React from 'react';

import ReactJkMusicPlayer from 'react-jinke-music-player';

import {
    JK_MUSIC_PLAYER_DEFAULT_SETTINGS,
} from '../config/components-defaults-config';
import { SONGS_FEED, SONG_DETAILS } from '../utils/enumerations';
import { WAVEFORM_IMAGE_WIDTH } from '../config/application-config';
import { getUiid, jinkieMockSongs } from '../utils/mocks';
import { isArrayEmpty } from '../utils/common-utils';
import Nav from './pure-functional-components/Nav';
import SongDetails from './SongDetails';
import SongsFeed from './SongsFeed';

class MainScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            //Management/Controller
            currentView: SONGS_FEED,

            //SongsFeed
            waveformProgressBarWidth: 0,
            audioList: [],
            songPlaying: false,
            songsInFeed: jinkieMockSongs,

            //SongDetails
            songToDisplay: {},

            playerUiid: ''
        };

        this.musicPlayerRef = React.createRef();
    }

    calculateProgressBarWidth = () => {
        if (!this.musicPlayerRef.current || !this.musicPlayerRef.current.state || _.isEqual(this.musicPlayerRef.current.state.currentTime, 0)) {
            return 0;
        }
        return (
            (_.get(this, 'musicPlayerRef.current.state.currentTime') / _.get(this, 'musicPlayerRef.current.state.duration')) * WAVEFORM_IMAGE_WIDTH
        );
    };

    render() {
        return (
            <div className="main-screen">
                <Nav />

                {
                    {
                        SONGS_FEED: <SongsFeed
                            musicPlayerRef={this.musicPlayerRef}
                            currentAudioList={this.state.audioList}
                            waveformProgressBarWidth={this.state.waveformProgressBarWidth}
                            songPlaying={this.state.songPlaying}
                            songsInFeed={this.state.songsInFeed}
                            updateAudioList={(newAudioList, shouldRerenderPlayer) => {
                                const newState = shouldRerenderPlayer?
                                    {
                                        audioList: newAudioList,
                                        playerUiid: getUiid()
                                    }:
                                    {
                                        audioList: newAudioList,
                                    };

                                this.setState(newState);
                            }}
                            switchViewToSongDetails={(songToDisplay) => {
                                this.setState({
                                    songToDisplay: songToDisplay,
                                    currentView: SONG_DETAILS
                                });
                            }}
                        />,
                        SONG_DETAILS: <SongDetails
                            songToDisplay={this.state.songToDisplay}
                            goToSongsFeed={() => {
                                this.setState({
                                    currentView: SONGS_FEED
                                });
                            }}
                        />
                    }[this.state.currentView]
                }

                {/*{!this.isPlaylistEmpty() && (*/}
                <ReactJkMusicPlayer
                    {...JK_MUSIC_PLAYER_DEFAULT_SETTINGS}
                    audioLists={this.state.audioList}
                    autoPlay={!isArrayEmpty(this.state.audioList)}
                    ref={this.musicPlayerRef}
                    key={this.state.playerUiid}
                    onAudioPlay={() => {
                        setTimeout(() => {
                            this.setState({
                                waveformProgressBarWidth: this.calculateProgressBarWidth(),
                                songPlaying: true,
                            });
                        }, 500);
                    }}
                    onAudioPause={() => {
                        this.setState({
                            waveformProgressBarWidth: this.calculateProgressBarWidth(),
                            songPlaying: false,
                        });
                    }}
                    onAudioSeeked={() => {
                        this.setState({
                            waveformProgressBarWidth: this.calculateProgressBarWidth(),
                        });
                    }}
                />
                {/*)}*/}
            </div>
        );
    }
}

export default MainScreen;
