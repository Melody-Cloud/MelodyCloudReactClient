import 'assets/scss/MainScreen.scss';
import 'react-jinke-music-player/assets/index.css';

import Notyf from 'notyf';
import _ from 'lodash';

import { Button, Card, Container, Grid, Icon, Image, Label, List, Popup } from 'semantic-ui-react';
import React from 'react';

import ReactJkMusicPlayer from 'react-jinke-music-player';

import { DEFAULT_PLAYER_VOLUME, WAVEFORM_IMAGE_HEIGHT, WAVEFORM_IMAGE_WIDTH } from '../config/application-config';
import { WaveformProgress } from './WaveformProgress';
import { getUiid, jinkieMockSongs } from '../utils/mocks';
import { isArrayEmpty } from '../utils/common-utils';
import Nav from './pure-functional-components/Nav';

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

    static renderSongCard(songObject) {
        return (
            <Card color="green">
                <Image src={_.get(songObject, 'cover')} />
                <Card.Content>
                    <Card.Header>
                        <span className="name">{_.get(songObject, 'name')}</span>
                        <a className="song-show-more-info" href="/">
                            (<Icon name="chain" />
                            details)
                        </a>
                    </Card.Header>
                    <Card.Description>
                        <Popup
                            trigger={<a href="/">Click to display song description</a>}
                            content="Add users to your feed"
                            position="bottom left"
                            on="click"
                        />
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <span className="date">
                        <Icon name="user" />
                        {_.get(songObject, 'singer')}
                    </span>
                </Card.Content>
                <Card.Content extra>
                    <span className="date">
                        <Icon name="play" />
                        {_.get(songObject, 'amountOfPlays')} plays
                    </span>
                </Card.Content>
                <Card.Content extra>
                    <span className="date">
                        <Icon name="thumbs up outline" />
                        {_.get(songObject, 'amountOfLikes')} likes
                    </span>
                </Card.Content>
            </Card>
        );
    }

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
                                            <Grid.Column
                                                mobile={4}
                                                tablet={3}
                                                computer={3}
                                                largeScreen={3}
                                                widescreen={2}
                                            >
                                                {MainScreen.renderSongCard(songObject)}
                                            </Grid.Column>
                                            <Grid.Column
                                                mobile={2}
                                                tablet={2}
                                                computer={2}
                                                largeScreen={2}
                                                widescreen={2}
                                                className="play-button-column"
                                            >
                                                {isThisSongOnTopOfPlaylist && isAnySongPlaying
                                                    ? this.renderPauseButton()
                                                    : this.renderPlayButton(songObject)}
                                                {this.renderAppendToPlaylistButton(songObject)}
                                            </Grid.Column>
                                            <Grid.Column
                                                mobile={9}
                                                tablet={8}
                                                computer={8}
                                                largeScreen={8}
                                                widescreen={8}
                                                className="waveform-column"
                                            >
                                                <WaveformProgress
                                                    waveformImageSource={_.get(songObject, 'waveform')}
                                                    imageWidth={WAVEFORM_IMAGE_WIDTH}
                                                    imageHeight={WAVEFORM_IMAGE_HEIGHT}
                                                    waveformProgressBarWidth={this.state.waveformProgressBarWidth}
                                                    animationDuration={
                                                        Math.floor(
                                                            _.get(this, 'musicPlayerRef.current.state.duration'),
                                                        ) -
                                                        Math.ceil(
                                                            _.get(this, 'musicPlayerRef.current.state.currentTime'),
                                                        )
                                                    }
                                                    isAnimationEnabled={isAnySongPlaying}
                                                    isActive={isThisSongOnTopOfPlaylist}
                                                />
                                            </Grid.Column>
                                            <Grid.Column
                                                mobile={1}
                                                tablet={3}
                                                computer={3}
                                                largeScreen={3}
                                                widescreen={4}
                                            >
                                                <div>
                                                    <Label color="green">
                                                        <Icon name="music" />
                                                        Electronic
                                                    </Label>
                                                    <Label color="green">
                                                        <Icon name="music" />
                                                        Alternative rock
                                                    </Label>
                                                    <Label color="green">
                                                        <Icon name="music" />
                                                        Rap & Hip-hop
                                                    </Label>
                                                </div>
                                            </Grid.Column>
                                        </Grid>
                                    </List.Content>
                                </List.Item>
                            );
                        })}
                    </List>

                    <p>Lorem ipsum</p>
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
