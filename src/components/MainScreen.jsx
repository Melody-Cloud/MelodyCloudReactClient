import 'assets/scss/MainScreen.scss';
import 'react-jinke-music-player/assets/index.css';

import Notyf from 'notyf';
import _ from 'lodash';

import { Button, Container, Grid, Icon, Label, List } from 'semantic-ui-react';
import React from 'react';

import ReactJkMusicPlayer from 'react-jinke-music-player';

import { DEFAULT_PLAYER_VOLUME, WAVEFORM_IMAGE_HEIGHT, WAVEFORM_IMAGE_WIDTH } from '../config/application-config';
import { WaveformProgress } from './WaveformProgress';
import { getUiid, jinkieMockSongs } from '../utils/mocks';
import { isArrayEmpty } from '../utils/common-utils';
import Nav from './pure-functional-components/Nav';
import SongCard from './pure-functional-components/SongCard';
import {
    FIRST_COLUMN_PROPS,
    FIRST_COLUMN_SETTINGS,
    FOURTH_COLUMN_PROPS,
    SECOND_COLUMN_PROPS,
    THIRD_COLUMN_PROPS,
} from '../config/visuals-config';
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
        if (
            !this.musicPlayerRef.current ||
            !this.musicPlayerRef.current.state ||
            _.isEqual(this.musicPlayerRef.current.state.currentTime, 0)
        ) {
            return 0;
        }
        return (
            (_.get(this, 'musicPlayerRef.current.state.currentTime') /
                _.get(this, 'musicPlayerRef.current.state.duration')) *
            WAVEFORM_IMAGE_WIDTH
        );
    };

    renderPlayButton = singleSong => (
        <Button
            className="play-button"
            circular
            icon="play"
            size="huge"
            onClick={() => {
                const isThisSongFirstInPlaylist = _.isEqual(
                    _.get(this, 'musicPlayerRef.current.state.audioLists[0]'),
                    singleSong,
                );
                const isSongEnded =
                    _.get(this, 'musicPlayerRef.current.state.currentTime') >=
                    Math.floor(_.get(this, 'musicPlayerRef.current.state.duration'));
                // TODO: maybe this double-checking with math.floor is not needed

                if (!isThisSongFirstInPlaylist || isSongEnded) {
                    const reorderedAudioList = this.getReorderedAudioList(singleSong);

                    this.setState({
                        audioList: reorderedAudioList,
                        playerUiid: getUiid(),
                    });
                } else {
                    const onPlayFunction = _.get(this, 'musicPlayerRef.current.onPlay');
                    onPlayFunction();
                }
            }}
            color="green"
            inverted
        />
    );

    renderPauseButton = () => (
        <Button
            className="play-button"
            circular
            icon="pause"
            size="huge"
            onClick={() => {
                const pauseAudioFunction = _.get(this, 'musicPlayerRef.current._pauseAudio');
                pauseAudioFunction();
            }}
            color="green"
            inverted
        />
    );

    renderAppendToPlaylistButton = singleSong => (
        <Button
            className="add-to-playlist-button"
            circular
            icon="plus"
            color="green"
            inverted
            onClick={() => {
                const currentAudioListToBeUpdated = _.clone(this.state.audioList);
                currentAudioListToBeUpdated.push(singleSong);
                this.setState({
                    audioList: currentAudioListToBeUpdated,
                });

                const notyf = new Notyf({
                    delay: 2000,
                });
                notyf.confirm(`Song ${_.get(singleSong, 'name')} was added to your playlist`);
            }}
        />
    );

    render() {
        const flooredSongDuration = Math.floor(_.get(this, 'musicPlayerRef.current.state.duration'));

        const currentSongTime = Math.ceil(_.get(this, 'musicPlayerRef.current.state.currentTime'));

        return (
            <div className="main-screen">
                <Nav />

                <Container className="feed-container" fluid>
                    <List id="songs-feed" celled>
                        {_.map(jinkieMockSongs, songObject => {
                            const isThisSongOnTopOfPlaylist = _.isEqual(
                                _.get(this, 'musicPlayerRef.current.state.audioLists[0]'),
                                songObject,
                            );

                            const isAnySongPlaying = _.get(this.state.songPlaying);

                            return (
                                <List.Item className="single-song-item">
                                    <List.Content>
                                        <Grid className="middle aligned" style={{ alignItems: 'center' }} stackable>
                                            <Grid.Column {...FIRST_COLUMN_PROPS}>
                                                <SongCard songObject={songObject} />
                                            </Grid.Column>
                                            <Grid.Column {...SECOND_COLUMN_PROPS}>
                                                {isThisSongOnTopOfPlaylist && isAnySongPlaying
                                                    ? this.renderPauseButton()
                                                    : this.renderPlayButton(songObject)}
                                                {this.renderAppendToPlaylistButton(songObject)}
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
                                                <div className='song-tags-wrapper'>
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
                        preload
                        audioLists={this.state.audioList}
                        mode="full"
                        autoPlay={!isArrayEmpty(this.state.audioList)}
                        ref={this.musicPlayerRef}
                        key={this.state.playerUiid}
                        defaultVolume={DEFAULT_PLAYER_VOLUME}
                        onAudioPlay={() => {
                            setTimeout(() => {
                                this.setState({
                                    waveformProgressBarWidth: this.calculateProgressBarWidth(),
                                    songPlaying: true,
                                });
                            }, 500);
                        }}
                        onAudioPause={() => {
                            const calculatedProgressBarWidth = this.calculateProgressBarWidth();

                            this.setState({
                                waveformProgressBarWidth: calculatedProgressBarWidth,
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
