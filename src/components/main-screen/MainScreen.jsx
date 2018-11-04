import 'assets/scss/MainScreen.scss';
import 'react-jinke-music-player/assets/index.css';

import _ from 'lodash';

import React from 'react';

import ReactJkMusicPlayer from 'react-jinke-music-player';

import { INDEX_OF_FIRST_SONG_IN_PLAYLIST, WAVEFORM_IMAGE_WIDTH, notyf } from '../../config/application-config';
import {
    JK_MUSIC_PLAYER_DEFAULT_SETTINGS,
} from '../../config/components-defaults-config';
import { Views } from '../../utils/enumerations';
import { getMockedAlbums, getMockedPlaylists, getUiid, jinkieMockSongs } from '../../utils/mocks';
import { isArrayEmpty } from '../../utils/common-utils';
import AlbumDetails from '../AlbumDetails';
import ArtistDetails from '../ArtistDetails';
import ExploreNewAlbums from '../ExploreNewAlbums';
import Footer from '../pure-functional-components/Footer';
import ListOfPlaylists from '../ListOfPlaylists';
import Nav from '../pure-functional-components/Nav';
import SongDetails from '../SongDetails';
import SongsFeed from '../SongsFeed';

class MainScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            //Management/Controller
            currentView: Views.SONGS_FEED,

            //SongsFeed
            waveformProgressBarWidth: 0,
            audioList: [],
            songPlaying: false,
            songsInFeed: jinkieMockSongs,

            playerUiid: '',
        };

        this.subviewDetails = {
            //SongDetails
            songToDisplay: {},

            //ArtistDetails
            artistToDisplay: {},

            //AlbumDetails
            albumToDisplay: {},
        };

        this.musicPlayerRef = React.createRef();
    }

    isPlaylistEmpty = () => {
        return _.isEqual(_.size(this.state.audioList), 0);
    };

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
            currentView: Views.SONGS_FEED,
        });
    };

    goToExploreNewAlbums = () => {
        this.setState({
            currentView: Views.EXPLORE_NEW_ALBUMS,
        });
    };

    goToMyPlaylists = () => {
        this.setState({
            currentView: Views.PLAYLIST_VIEW,
        });
    };

    switchViewToArtistDetails = (artistToDisplay) => {
        this.subviewDetails.artistToDisplay = artistToDisplay;

        this.setState({
            currentView: Views.ARTIST_DETAILS,
        });
    };

    switchViewToSongDetails = (songToDisplay) => {
        this.subviewDetails.songToDisplay = songToDisplay;

        this.setState({
            currentView: Views.SONG_DETAILS,
        });
    };

    switchViewToAlbumDetails = (albumToDisplay) => {
        this.subviewDetails.albumToDisplay = albumToDisplay;

        this.setState({
            currentView: Views.ALBUM_DETAILS,
        });
    };

    getSongsToDisplayByArtist = (artistToDisplay) => {
        return jinkieMockSongs;
    };

    getSongsToDisplayByAlbum = (albumToDisplay) => {
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
        const newState = shouldRerenderPlayer ?
            {
                audioList: newAudioList,
                playerUiid: getUiid(),
            } :
            {
                audioList: newAudioList,
            };

        this.setState(newState);
    };

    replaceAudioList = (newAudioList) => {
        const currentMusicPlayer = _.get(this.musicPlayerRef, 'current');

        const playAudioListFunc = _.get(currentMusicPlayer, 'audioListsPlay');

        this.setState({
            audioList: newAudioList,
        });

        currentMusicPlayer.setState({
            playId: INDEX_OF_FIRST_SONG_IN_PLAYLIST,
            audioList: newAudioList,
        });

        playAudioListFunc(INDEX_OF_FIRST_SONG_IN_PLAYLIST);
    };

    appendSongToPlaylist = (songObject) => {
        const currentAudioListToBeUpdated = _.clone(this.state.audioList);
        currentAudioListToBeUpdated.push(songObject);
        this.updateAudioList(currentAudioListToBeUpdated, false);
        notyf.confirm(`Song ${songObject.name} was added to your playlist`);
    };

    render() {
        const mainScreenRouting = {
            [Views.SONGS_FEED]: <SongsFeed
                musicPlayerRef={this.musicPlayerRef}
                waveformProgressBarWidth={this.state.waveformProgressBarWidth}
                songPlaying={this.state.songPlaying}
                songsInFeed={this.state.songsInFeed}

                switchViewToSongDetails={this.switchViewToSongDetails}
                switchViewToArtistDetails={this.switchViewToArtistDetails}
                appendSongToPlaylist={this.appendSongToPlaylist}
                playSongInPlayer={this.playSongInPlayer}
            />,
            [Views.SONG_DETAILS]: <SongDetails
                songToDisplay={this.subviewDetails.songToDisplay}

                goToSongsFeed={this.goToSongsFeed}
                switchViewToArtistDetails={this.switchViewToArtistDetails}
                appendSongToPlaylist={this.appendSongToPlaylist}
                playSongInPlayer={this.playSongInPlayer}
            />,
            [Views.ARTIST_DETAILS]: <ArtistDetails
                artistToDisplay={this.subviewDetails.artistToDisplay}
                songsCreatedByThisArtist={this.getSongsToDisplayByArtist(this.subviewDetails.artistToDisplay)}

                goToSongsFeed={this.goToSongsFeed}
                switchViewToSongDetails={this.switchViewToSongDetails}
                switchViewToAlbumDetails={this.switchViewToAlbumDetails}
            />,
            [Views.ALBUM_DETAILS]: <AlbumDetails
                goToSongsFeed={this.goToSongsFeed}
                switchViewToSongDetails={this.switchViewToSongDetails}
                albumToDisplay={this.subviewDetails.albumToDisplay}
                songsInThisAlbum={this.getSongsToDisplayByAlbum(this.subviewDetails.albumToDisplay)}
                switchViewToArtistDetails={this.switchViewToArtistDetails}
                replaceAudioList={this.replaceAudioList}
            />,
            [Views.EXPLORE_NEW_ALBUMS]: <ExploreNewAlbums
                goToSongsFeed={this.goToSongsFeed}
                listOfAlbumsToPresent={getMockedAlbums()}
                switchViewToAlbumDetails={this.switchViewToAlbumDetails}
            />,
            [Views.PLAYLIST_VIEW]: <ListOfPlaylists
                goToSongsFeed={this.goToSongsFeed}
                listOfPlaylistsToDisplay={getMockedPlaylists()}
            />,
        };

        return (
            <div className="main-screen">
                <Nav
                    goToSongsFeed={this.goToSongsFeed}
                    goToExploreNewAlbums={this.goToExploreNewAlbums}
                    goToMyPlaylists={this.goToMyPlaylists}
                />

                {
                    mainScreenRouting[this.state.currentView]
                }

                {!this.isPlaylistEmpty() && (
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
                )}
                <Footer/>
            </div>
        );
    }
}

export default MainScreen;
