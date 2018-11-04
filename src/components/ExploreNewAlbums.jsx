import 'assets/scss/ExploreNewAlbums.scss';

import { Breadcrumb, Button, Container, Header, Icon, Image, List } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import React from 'react';
import _ from 'lodash';
import GenericBreadcrumbs from './pure-functional-components/GenericBreadcrumbs';

class ExploreNewAlbums extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        const {
            listOfAlbumsToPresent,

            goToSongsFeed,
            switchViewToAlbumDetails,
        } = this.props;

        return <Container className="albums-feed-container">
            <GenericBreadcrumbs
                goToSongsFeed={goToSongsFeed}
                activeItemLabel={'Explore new albums'}
            />

            <Header as='h2' className='explore-new-albums-header txt-center'>Explore new albums</Header>

            <List
                id="albums-feed"
                size={'huge'}
                celled
            >
                {_.map(listOfAlbumsToPresent, albumObject => {
                    return (
                        <List.Item
                            className="single-album-item-in-explore-new-albums"
                            onClick={() => {
                                switchViewToAlbumDetails(albumObject)
                            }}
                        >
                            <Image avatar src={albumObject.albumMiniature}/>
                            <List.Content>
                                <List.Header>{albumObject.albumName}</List.Header>
                                <span>An excellent companion</span>
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
    switchViewToAlbumDetails: PropTypes.func,
};