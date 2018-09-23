import React from "react";
import {Menu, Container, Input, Icon, Item, List, Card, Grid, Popup, Visibility, Sticky} from "semantic-ui-react";
import 'assets/scss/MainScreen.scss';
import Audio from 'react-audioplayer';

import _ from 'lodash';
import {mockedPlaylist} from "../utils/mocks";

class MainScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            windowWidth: 0,
            windowHeight: 0
        };

        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    updateWindowDimensions() {
        this.setState({ windowWidth: window.innerWidth, windowHeight: window.innerHeight });
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
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
                                            <Grid.Column width={12}>
                                                {

                                                    (_.get(singleSong, 'name') == 'Song1') ?
                                                        <Sticky
                                                            onStick={(event, data) => {
                                                                console.log('stick');
                                                            }}
                                                            onUnstick={(event, data) => {
                                                                console.log('unstick');
                                                            }}
                                                            offset={55}
                                                            pushing
                                                        >
                                                            <Audio
                                                                width={600}
                                                                height={200}
                                                                autoPlay={false}
                                                                playlist={[singleSong]}
                                                                fullPlayer={true}
                                                                comment={true}
                                                            />
                                                        </Sticky>:
                                                        <Audio
                                                            width={600}
                                                            height={200}
                                                            autoPlay={false}
                                                            playlist={[singleSong]}
                                                            fullPlayer={true}
                                                            comment={true}
                                                        />
                                                }

                                            </Grid.Column>
                                        </Grid>
                                    </List.Content>
                                </List.Item>;
                            })
                        }
                    </List>

                    <p>Lorem ipsum</p>
                    <p>Lorem ipsum</p>
                    <p>Lorem ipsum</p>
                    <p>Lorem ipsum</p>
                    <p>Lorem ipsum</p>
                    <p>Lorem ipsum</p>
                    <p>Lorem ipsum</p>
                    <p>Lorem ipsum</p>
                    <p>Lorem ipsum</p>
                    <p>Lorem ipsum</p>
                    <p>Lorem ipsum</p>
                    <p>Lorem ipsum</p>
                    <p>Lorem ipsum</p>
                    <p>Lorem ipsum</p>
                </Container>
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