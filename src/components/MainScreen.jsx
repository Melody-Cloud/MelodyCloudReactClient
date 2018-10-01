import React from "react";
import {Menu, Container, Input, Icon, Item, List, Card, Grid, Popup, Button, Image, Label} from "semantic-ui-react";
import 'assets/scss/MainScreen.scss';
import ReactJkMusicPlayer from "react-jinke-music-player";
import "react-jinke-music-player/assets/index.css";

import _ from 'lodash';
import {getUiid, jinkieMockSongs} from "../utils/mocks";
import {isArrayEmpty} from "../utils/common-utils";
import {DEFAULT_PLAYER_VOLUME, WAVEFORM_IMAGE_HEIGHT, WAVEFORM_IMAGE_WIDTH} from "../config/application-config";
import {WaveformProgress} from "./WaveformProgress";
import SoundBars from "./SoundBars";

class MainScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            audioList: [

            ],
            waveformProgressWidth: 0,
            songPlaying: false
        };

        this.musicPlayerRef = React.createRef();

        // setInterval(() => {
        //     console.dir(this.musicPlayerRef);
        // }, 1000);
    }

    _getReorderedAudioList = (singleSong) => {
        let currentAudioListToBeUpdated = _.clone(this.state.audioList);
        let audioListWithDuplicateSongRemoved = _.pull(currentAudioListToBeUpdated, singleSong);
        audioListWithDuplicateSongRemoved.unshift(singleSong);

        return currentAudioListToBeUpdated;
    };

    render() {
        return (
            <div className="main-screen">
                <Menu
                    className='top-sticked-menu'
                    fixed={'top'}
                    inverted
                    stackable
                    borderless
                >
                    <Container text>
                        <Menu.Item header>
                            <Icon name='cloud' /> MelodyCloud
                        </Menu.Item>
                        <Menu.Item as='a'>
                            <Input icon='search' placeholder='Search for songs...' />
                        </Menu.Item>
                    </Container>
                </Menu>

                <Container className='feed-container' fluid>
                    <List id='songs-feed' celled>
                        {
                            _.map(jinkieMockSongs, singleSong => {
                                const isActive = _.isEqual(
                                    _.get(this, 'musicPlayerRef.current.state.audioLists[0]'),
                                    singleSong
                                );

                                const isSongPlaying = _.get(this, 'state.songPlaying');

                                return <List.Item className='single-song-item'>
                                    <List.Content>
                                        <Grid className='middle aligned' style={{alignItems: 'center'}}>
                                            <Grid.Column width={3}>
                                                {this._renderSongDetails(singleSong)}
                                            </Grid.Column>
                                            <Grid.Column width={2} className='play-button-column'>
                                                {
                                                    (isActive && isSongPlaying) ?
                                                        <div className='bars-wrapper' onClick={() => {
                                                            const pauseAudioFunction =
                                                                _.get(this, 'musicPlayerRef.current._pauseAudio');
                                                            pauseAudioFunction();
                                                        }}>
                                                            <SoundBars/>
                                                        </div>:
                                                        <Button
                                                            className='play-button'
                                                            circular icon='play'
                                                            size='huge'
                                                            onClick={() => {
                                                                const isThisSongFirstInPlaylist = _.isEqual(
                                                                    _.get(this, 'musicPlayerRef.current.state.audioLists[0]'),
                                                                    singleSong
                                                                );

                                                                if(!isThisSongFirstInPlaylist) {
                                                                    let reorderedAudioList = this._getReorderedAudioList(singleSong);

                                                                    this.setState({
                                                                        audioList: reorderedAudioList,
                                                                        playerUiid: getUiid()
                                                                    });
                                                                } else {
                                                                    const onPlayFunction =
                                                                        _.get(this, 'musicPlayerRef.current.onPlay');
                                                                    onPlayFunction();
                                                                }
                                                            }}
                                                            color='green'
                                                            inverted
                                                        />
                                                }
                                            </Grid.Column>
                                            <Grid.Column width={8} className='waveform-column'>
                                                <WaveformProgress
                                                    waveformSrc={_.get(singleSong, 'waveform')}
                                                    imageWidth={WAVEFORM_IMAGE_WIDTH}
                                                    imageHeight={WAVEFORM_IMAGE_HEIGHT}
                                                    progressFilterWidth={this.state.waveformProgressWidth}
                                                    animationDuration={
                                                        Math.floor(_.get(this, 'musicPlayerRef.current.state.duration')) -
                                                        Math.ceil(_.get(this, 'musicPlayerRef.current.state.currentTime'))
                                                    }
                                                    isSongPlaying={
                                                        isSongPlaying
                                                    }
                                                    isActive={
                                                        isActive
                                                    }

                                                />
                                            </Grid.Column>
                                            <Grid.Column width={3}>
                                                <div>
                                                    <Label color='green'>
                                                        <Icon name='music' />
                                                        Electronic
                                                    </Label>
                                                    <Label color='green'>
                                                        <Icon name='music' />
                                                        Alternative rock
                                                    </Label>
                                                    <Label color='green'>
                                                        <Icon name='music' />
                                                        Rap & Hip-hop
                                                    </Label>
                                                </div>
                                            </Grid.Column>
                                        </Grid>
                                    </List.Content>
                                </List.Item>;
                            })
                        }
                    </List>

                    <p>Lorem ipsum</p>
                </Container>

                {
                    !_.isEqual(_.size(this.state.audioList), 0) && <ReactJkMusicPlayer
                        audioLists={this.state.audioList}
                        mode={'full'}
                        autoPlay={!isArrayEmpty(this.state.audioList)}
                        ref={this.musicPlayerRef}
                        key={this.state.playerUiid}
                        defaultVolume={DEFAULT_PLAYER_VOLUME}
                        onAudioPlay={() => {
                            setTimeout(() => {
                                this.setState({
                                    waveformProgressWidth: this._calculateProgressBarWidth(),
                                    songPlaying: true
                                });
                            }, 500);
                        }}
                        onAudioPause={() => {
                            this.setState({
                                waveformProgressWidth: this._calculateProgressBarWidth(),
                                songPlaying: false
                            });
                        }}
                        onAudioSeeked={() => {
                            this.setState({
                                waveformProgressWidth: this._calculateProgressBarWidth()
                            });
                        }}
                    />
                }
            </div>
        );
    }

    _renderSongDetails(singleSong) {
        return <Card color='green'>
            <Image src={_.get(singleSong, 'cover')} />
            <Card.Content>
                <Card.Header>
                    <span className="name">{_.get(singleSong, 'name')}</span>
                    <a className='song-show-more-info'>(<Icon name='chain'/>details)</a>
                </Card.Header>
                <Card.Description>
                    <Popup trigger={<a>Click to display song description</a>} content='Add users to your feed' position='bottom left' on='click'/>
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <span className='date'><Icon name='user' />{_.get(singleSong, 'singer')}</span>
            </Card.Content>
            <Card.Content extra>
                <span className='date'><Icon name='play' />{_.get(singleSong, 'amountOfPlays')} plays</span>
            </Card.Content>
            <Card.Content extra>
                <span className='date'><Icon name='thumbs up outline' />{_.get(singleSong, 'amountOfLikes')} likes</span>
            </Card.Content>
        </Card>;
    }

    _calculateProgressBarWidth = () => {
        if (!this.musicPlayerRef.current || !this.musicPlayerRef.current.state || _.isEqual(this.musicPlayerRef.current.state.currentTime, 0)) {
            return 0;
        } else {
            return (_.get(this, 'musicPlayerRef.current.state.currentTime')/_.get(this, 'musicPlayerRef.current.state.duration'))*WAVEFORM_IMAGE_WIDTH;
        }
    }
}

export default MainScreen