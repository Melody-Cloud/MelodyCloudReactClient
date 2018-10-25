import 'assets/scss/MainScreen.scss';
import 'react-jinke-music-player/assets/index.css';

import _ from 'lodash';

import React from 'react';

import ReactJkMusicPlayer from 'react-jinke-music-player';

import { ARTIST_DETAILS, SONGS_FEED, SONG_DETAILS } from '../utils/enumerations';
import {
    JK_MUSIC_PLAYER_DEFAULT_SETTINGS,
} from '../config/components-defaults-config';
import { WAVEFORM_IMAGE_WIDTH, notyf } from '../config/application-config';
import { getUiid, jinkieMockSongs } from '../utils/mocks';
import { isArrayEmpty } from '../utils/common-utils';
import ArtistDetails from './ArtistDetails';
import Footer from './pure-functional-components/Footer';
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

            //ArtistDetails
            artistToDisplay: {},

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

    goToSongsFeed = () => {
        this.setState({
            currentView: SONGS_FEED
        });
    };

    switchViewToArtistDetails = (artistToDisplay) => {
        this.setState({
            artistToDisplay: artistToDisplay,
            currentView: ARTIST_DETAILS
        });
    };

    switchViewToSongDetails = (songToDisplay) => {
        this.setState({
            songToDisplay: songToDisplay,
            currentView: SONG_DETAILS
        });
    };

    getSongsToDisplayByArtist = (artistToDisplay) => {
        return jinkieMockSongs;
    };

    getReorderedAudioList = songToBePlayedNow => {
        const newAudioListToBePlayed = _.clone(this.state.audioList);

        const audioListWithDuplicateSongRemoved = _.pull(newAudioListToBePlayed, songToBePlayedNow);
        audioListWithDuplicateSongRemoved.unshift(songToBePlayedNow);

        return newAudioListToBePlayed;
    };

    playSongInPlayer = (songObject) => {
        const reorderedAudioList = this.getReorderedAudioList(songObject);
        this.updateAudioList(reorderedAudioList, true);
    };

    updateAudioList = (newAudioList, shouldRerenderPlayer) => {
        const newState = shouldRerenderPlayer?
            {
                audioList: newAudioList,
                playerUiid: getUiid()
            }:
            {
                audioList: newAudioList,
            };

        this.setState(newState);
    };

    appendSongToPlaylist = (songObject) => {
        const currentAudioListToBeUpdated = _.clone(this.state.audioList);
        currentAudioListToBeUpdated.push(songObject);
        this.updateAudioList(currentAudioListToBeUpdated, false);
        notyf.confirm(`Song ${songObject.name} was added to your playlist`);
    };

    render() {
        const mainScreenRouting = {
            SONGS_FEED: <SongsFeed
                musicPlayerRef={this.musicPlayerRef}
                waveformProgressBarWidth={this.state.waveformProgressBarWidth}
                songPlaying={this.state.songPlaying}
                songsInFeed={this.state.songsInFeed}
                switchViewToSongDetails={(songToDisplay) => {
                    this.setState({
                        songToDisplay: songToDisplay,
                        currentView: SONG_DETAILS
                    });
                }}
                switchViewToArtistDetails={this.switchViewToArtistDetails}
                appendSongToPlaylist={this.appendSongToPlaylist}
                playSongInPlayer={this.playSongInPlayer}
            />,
            SONG_DETAILS: <SongDetails
                songToDisplay={this.state.songToDisplay}
                goToSongsFeed={this.goToSongsFeed}
                switchViewToArtistDetails={this.switchViewToArtistDetails}
                appendSongToPlaylist={this.appendSongToPlaylist}
                playSongInPlayer={this.playSongInPlayer}
            />,
            ARTIST_DETAILS: <ArtistDetails
                artistToDisplay={this.state.artistToDisplay}
                goToSongsFeed={this.goToSongsFeed}
                switchViewToSongDetails={this.switchViewToSongDetails}
                songsCreatedByThisArtist={this.getSongsToDisplayByArtist(this.state.artistToDisplay)}
            />,
        };

        return (
            <div className="main-screen">
                <Nav />

                {
                    mainScreenRouting[this.state.currentView]
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
                <Footer/>
            </div>
        );
    }
}

export default MainScreen;
