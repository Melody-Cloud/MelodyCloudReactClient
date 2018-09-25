import React from "react";
import {Menu, Container, Input, Icon, Item, List, Card, Grid, Popup} from "semantic-ui-react";
import 'assets/scss/MainScreen.scss';
import ReactJkMusicPlayer from "react-jinke-music-player";
import "react-jinke-music-player/assets/index.css";

import _ from 'lodash';
import {mockedPlaylist} from "../utils/mocks";

class MainScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            audioLists: [
                {
                    name: "丑",
                    singer: "草东没有派对",
                    cover: "https://www.lijinke.cn/music/1387583682387727.jpg",
                    musicSrc: "https://s0.vocaroo.com/media/download_temp/Vocaroo_s01uFiNgRFGP.mp3"
                },
                {
                    name: "达尔文",
                    singer: "蔡健雅",
                    cover: "https://www.lijinke.cn/music/5V49G-3GFLn-f6mRjHsGaUAh.jpg",
                    musicSrc: "https://s0.vocaroo.com/media/download_temp/Vocaroo_s0crYi8mrRBP.mp3"
                }
            ]
        }
    }

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
                            _.map(mockedPlaylist, singleSong => {
                                return <List.Item className='single-song-item'>
                                    <List.Content>
                                        <Grid>
                                            <Grid.Column width={4}>
                                                {this._renderSongDetails(singleSong)}
                                            </Grid.Column>
                                        </Grid>
                                    </List.Content>
                                </List.Item>;
                            })
                        }
                    </List>

                    <p>Lorem ipsum</p>
                </Container>

                <ReactJkMusicPlayer audioLists={this.state.audioLists} mode={'full'} />
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
}

export default MainScreen