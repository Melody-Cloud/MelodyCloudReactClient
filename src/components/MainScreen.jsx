import React from "react";
import {Menu, Container, Input, Icon, Item, List, Card, Grid, Popup, Button, Image} from "semantic-ui-react";
import 'assets/scss/MainScreen.scss';
import ReactJkMusicPlayer from "react-jinke-music-player";
import "react-jinke-music-player/assets/index.css";

import _ from 'lodash';
import {getUiid, jinkieMockSongs} from "../utils/mocks";
import {isArrayEmpty} from "../utils/common-utils";
import {DEFAULT_PLAYER_VOLUME, WAVEFORM_IMAGE_HEIGHT, WAVEFORM_IMAGE_WIDTH} from "../config/application-config";
import WaveformMock from 'assets/img/out2.png';
import {WaveformProgress} from "./WaveformProgress";


class MainScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            audioList: [

            ]
        };

        this.musicPlayerRef = React.createRef();

        setInterval(() => {
            console.log(this.musicPlayerRef.current.state.currentTime);
        }, 2000);
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
                        <List.Item>
                            <WaveformProgress
                                waveformSrc={WaveformMock}
                                imageWidth={WAVEFORM_IMAGE_WIDTH}
                                imageHeight={WAVEFORM_IMAGE_HEIGHT}
                                progressFilterWidth={400}
                            />
                        </List.Item>
                        {
                            _.map(jinkieMockSongs, singleSong => {
                                return <List.Item className='single-song-item'>
                                    <List.Content>
                                        <Grid>
                                            <Grid.Column width={4}>
                                                {this._renderSongDetails(singleSong)}
                                            </Grid.Column>
                                            <Grid.Column width={12}>
                                                <Button
                                                    content='Primary'
                                                    onClick={() => {
                                                        let reorderedAudioList = this._getReorderedAudioList(singleSong);

                                                        this.setState({
                                                            audioList: reorderedAudioList,
                                                            playerUiid: getUiid()
                                                        });
                                                    }}
                                                    primary
                                                />
                                            </Grid.Column>
                                        </Grid>
                                    </List.Content>
                                </List.Item>;
                            })
                        }
                    </List>

                    <p>Lorem ipsum</p>
                </Container>

                {this._renderAudioPlayer(this.state.audioList)}
            </div>
        );
    }

    _renderSongDetails(singleSong) {
        return <Card>
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
                <span className='date'><Icon name='play' />3200 plays</span>
            </Card.Content>
            <Card.Content extra>
                <span className='date'><Icon name='thumbs up outline' />100 likes</span>
            </Card.Content>
            <Card.Content extra>
                <span className='date'><Icon name='calendar' />Created in 2015</span>
            </Card.Content>
        </Card>;
    }

    _renderAudioPlayer(audioList) {
        console.dir(audioList);

        return <ReactJkMusicPlayer
            audioLists={audioList}
            mode={'full'}
            autoPlay={!isArrayEmpty(audioList)}
            ref={this.musicPlayerRef}
            key={this.state.playerUiid}
            defaultVolume={DEFAULT_PLAYER_VOLUME}
        />;
    }
}

export default MainScreen