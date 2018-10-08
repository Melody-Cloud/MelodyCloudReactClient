import 'assets/scss/MainScreen.scss';
import 'react-jinke-music-player/assets/index.css';

import _ from 'lodash';

import { Button, Container, Grid, List } from 'semantic-ui-react';
import React from 'react';

import ReactJkMusicPlayer from 'react-jinke-music-player';

import {
    APPEND_TO_PLAYLIST_BUTTON_PROPS,
    FIRST_COLUMN_PROPS,
    FOURTH_COLUMN_PROPS,
    JK_MUSIC_PLAYER_DEFAULT_SETTINGS,
    PAUSE_BUTTON_PROPS,
    PLAY_BUTTON_PROPS,
    SECOND_COLUMN_PROPS,
    THIRD_COLUMN_PROPS,
} from '../config/components-defaults-config';
import { WAVEFORM_IMAGE_HEIGHT, WAVEFORM_IMAGE_WIDTH, notyf } from '../config/application-config';
import { WaveformProgress } from './WaveformProgress';
import { getUiid, jinkieMockSongs } from '../utils/mocks';
import { isArrayEmpty } from '../utils/common-utils';
import Nav from './pure-functional-components/Nav';
import SongCard from './pure-functional-components/SongCard';
import SongTags from './pure-functional-components/SongTags';

class MainScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            audioList: [],
            waveformProgressBarWidth: 0,
            songPlaying: false,
        };

        this.musicPlayerRef = React.createRef();
    }

    getReorderedAudioList = songToBePlayedNow => {
        const newAudioListToBePlayed = _.clone(this.state.audioList);
        const audioListWithDuplicateSongRemoved = _.pull(newAudioListToBePlayed, songToBePlayedNow);
        audioListWithDuplicateSongRemoved.unshift(songToBePlayedNow);

        return newAudioListToBePlayed;
    };

    calculateProgressBarWidth = () => {
        if (!this.musicPlayerRef.current || !this.musicPlayerRef.current.state || _.isEqual(this.musicPlayerRef.current.state.currentTime, 0)) {
            return 0;
        }
        return (
            (_.get(this, 'musicPlayerRef.current.state.currentTime') / _.get(this, 'musicPlayerRef.current.state.duration')) * WAVEFORM_IMAGE_WIDTH
        );
    };

    isGivenSongFirstInPlaylist = songObject => {
        return _.isEqual(_.get(this, 'musicPlayerRef.current.state.audioLists[0]'), songObject);
    };

    isCurrentSongAlmostAtTheEnd = () => {
        return _.get(this, 'musicPlayerRef.current.state.currentTime') >= Math.floor(_.get(this, 'musicPlayerRef.current.state.duration'));
    };

    onPlayButtonClicked = songObject => {
        const isThisSongFirstInPlaylist = this.isGivenSongFirstInPlaylist(songObject);
        const isSongAtTheEnd = this.isCurrentSongAlmostAtTheEnd();

        if (!isThisSongFirstInPlaylist || isSongAtTheEnd) {
            const reorderedAudioList = this.getReorderedAudioList(songObject);

            this.setState({
                audioList: reorderedAudioList,
                playerUiid: getUiid(),
            });
        } else {
            const onPlayFunction = _.get(this, 'musicPlayerRef.current.onPlay');
            onPlayFunction();
        }
    };

    appendSongToPlaylist = (songObject) => {
        const currentAudioListToBeUpdated = _.clone(this.state.audioList);
        currentAudioListToBeUpdated.push(songObject);
        this.setState({
            audioList: currentAudioListToBeUpdated,
        });

        notyf.confirm(`Song ${_.get(songObject, 'name')} was added to your playlist`);
    };

    render() {
        const flooredSongDuration = Math.floor(_.get(this, 'musicPlayerRef.current.state.duration'));

        const currentSongTime = Math.ceil(_.get(this, 'musicPlayerRef.current.state.currentTime'));

        return (
            <div className="main-screen">
                <Nav />

                <Container className="feed-container" fluid>
                    <List id="songs-feed" celled>
                        {_.map(jinkieMockSongs, songObject => {
                            const isThisSongOnTopOfPlaylist = this.isGivenSongFirstInPlaylist(songObject);

                            const isAnySongPlaying = this.state.songPlaying;

                            return (
                                <List.Item className="single-song-item">
                                    <List.Content>
                                        <Grid className="middle aligned" style={{ alignItems: 'center' }} stackable>
                                            <Grid.Column {...FIRST_COLUMN_PROPS}>
                                                <SongCard songObject={songObject} />
                                            </Grid.Column>
                                            <Grid.Column {...SECOND_COLUMN_PROPS}>
                                                {isThisSongOnTopOfPlaylist && isAnySongPlaying ? (
                                                    <Button
                                                        {...PAUSE_BUTTON_PROPS}
                                                        onClick={() => {
                                                            const pauseAudioFunction = _.get(this, 'musicPlayerRef.current._pauseAudio');
                                                            pauseAudioFunction();
                                                        }}
                                                    />
                                                ) : (
                                                    <Button
                                                        {...PLAY_BUTTON_PROPS}
                                                        onClick={() => {
                                                            this.onPlayButtonClicked(songObject);
                                                        }}
                                                    />
                                                )}
                                                <Button
                                                    {...APPEND_TO_PLAYLIST_BUTTON_PROPS}
                                                    onClick={() => {this.appendSongToPlaylist(songObject)}}
                                                />
                                            </Grid.Column>
                                            <Grid.Column {...THIRD_COLUMN_PROPS}>
                                                <WaveformProgress
                                                    waveformImageSource={_.get(songObject, 'waveform')}
                                                    imageWidth={WAVEFORM_IMAGE_WIDTH}
                                                    imageHeight={WAVEFORM_IMAGE_HEIGHT}
                                                    waveformProgressBarWidth={this.state.waveformProgressBarWidth}
                                                    animationDuration={flooredSongDuration - currentSongTime}
                                                    isAnimationEnabled={isAnySongPlaying}
                                                    isActive={isThisSongOnTopOfPlaylist}
                                                />
                                            </Grid.Column>
                                            <Grid.Column {...FOURTH_COLUMN_PROPS}>
                                                <div className="song-tags-wrapper">
                                                    <SongTags
                                                        songTags={['Electronic', 'Alternative rock', 'Rap & Hip-hop']}
                                                        //TODO: remove this mock
                                                    />
                                                </div>
                                            </Grid.Column>
                                        </Grid>
                                    </List.Content>
                                </List.Item>
                            );
                        })}
                    </List>
                </Container>

                {!_.isEqual(_.size(this.state.audioList), 0) && (
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
            </div>
        );
    }
}

export default MainScreen;
