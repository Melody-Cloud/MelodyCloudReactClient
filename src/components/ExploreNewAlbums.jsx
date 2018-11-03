import 'assets/scss/ExploreNewAlbums.scss';

import { Breadcrumb, Button, Container, Icon, Image, List } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import React from 'react';
import _ from 'lodash';

class ExploreNewAlbums extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        }
    }

    render() {
        const {
            listOfAlbumsToPresent,
            goToSongsFeed
        } = this.props;

        return <Container className="albums-feed-container">
            <Breadcrumb>
                <Button
                    onClick={goToSongsFeed}
                    color='blue'
                    className={'song-details-go-back-btn'}
                    basic
                >
                    <Icon name='arrow left'/> Back
                </Button>
                <Breadcrumb.Section
                    onClick={goToSongsFeed}
                    link
                >
                    Home
                </Breadcrumb.Section>
                <Breadcrumb.Divider />
                <Breadcrumb.Section active>Explore new albums</Breadcrumb.Section>
            </Breadcrumb>

            <List
                id="albums-feed"
                size={'big'}
                celled
            >
                {_.map(listOfAlbumsToPresent, albumObject => {
                    return (
                        <List.Item
                            className="single-album-item"
                        >
                            <List.Content>
                                <Image avatar src={albumObject.albumMiniature} />
                                <List.Content>
                                    <List.Header>{albumObject.albumName}</List.Header>
                                    <span>An excellent companion</span>
                                </List.Content>
                            </List.Content>
                        </List.Item>
                    );
                })}
            </List>
        </Container>;
    }
}

export default ExploreNewAlbums;

ExploreNewAlbums.propTypes = {
    listOfAlbumsToPresent: PropTypes.array,

    goToSongsFeed: PropTypes.func,
};