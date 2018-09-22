import React from "react";
import {Menu, Image, Container, Label, Input, Icon, Item, Button} from "semantic-ui-react";
import 'assets/scss/MainScreen.scss';
import Audio from 'react-audioplayer';

import times from 'lodash/times';

const Paragraph = () => (
    <p>
        {[
            'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum ',
            'tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas ',
            'semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ',
            'ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean ',
            'fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. ',
            'Donec non enim in turpis pulvinar facilisis. Ut felis. Praesent dapibus, neque id cursus faucibus, tortor ',
            'neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, ',
            'accumsan porttitor, facilisis luctus, metus',
        ].join('')}
    </p>
);

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
        const paragraph = <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />;
        const genericImageUrl = 'https://react.semantic-ui.com/images/wireframe/image.png';
        const song1 = {
            name: 'Song1', // song name
            src: 'https://s0.vocaroo.com/media/download_temp/Vocaroo_s0FRiotFhFzX.mp3', // song source address
            img: genericImageUrl, // (optional) song image source address
            comments: [] // (optional) comments to display of that song
        };

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
                    <Item.Group divided>
                        <Item>
                            <Audio
                                width={this.state.windowWidth-50}
                                height={200}
                                autoPlay={false}
                                playlist={[song1]}
                                fullPlayer={true}
                                comment={true}
                            />
                        </Item>
                        <Item>
                            <Item.Image src={genericImageUrl} />

                            <Item.Content>
                                <Item.Header as='a'>12 Years a Slave</Item.Header>
                                <Item.Meta>
                                    <span className='cinema'>Union Square 14</span>
                                </Item.Meta>
                                <Item.Description>{paragraph}</Item.Description>
                                <Item.Extra>
                                    <Label>IMAX</Label>
                                    <Label icon='globe' content='Additional Languages' />
                                </Item.Extra>
                            </Item.Content>
                        </Item>

                        <Item>
                            <Item.Image src={genericImageUrl} />

                            <Item.Content>
                                <Item.Header as='a'>My Neighbor Totoro</Item.Header>
                                <Item.Meta>
                                    <span className='cinema'>IFC Cinema</span>
                                </Item.Meta>
                                <Item.Description>{paragraph}</Item.Description>
                                <Item.Extra>
                                    <Button primary floated='right'>
                                        Buy tickets
                                        <Icon name='right chevron' />
                                    </Button>
                                    <Label>Limited</Label>
                                </Item.Extra>
                            </Item.Content>
                        </Item>

                        <Item>
                            <Item.Image src={genericImageUrl} />

                            <Item.Content>
                                <Item.Header as='a'>Watchmen</Item.Header>
                                <Item.Meta>
                                    <span className='cinema'>IFC</span>
                                </Item.Meta>
                                <Item.Description>{paragraph}</Item.Description>
                                <Item.Extra>
                                    <Button primary floated='right'>
                                        Buy tickets
                                        <Icon name='right chevron' />
                                    </Button>
                                </Item.Extra>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                    {times(3, i => <Paragraph key={i} />)}

                    {times(3, i => <Paragraph key={i} />)}

                    <Paragraph />

                    {times(4, i => <Paragraph key={i} />)}

                    <Paragraph />

                    {times(2, i => <Paragraph key={i} />)}
                </Container>
            </div>
        );
    }
}

export default MainScreen