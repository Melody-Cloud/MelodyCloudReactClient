import 'assets/scss/ExploreNewAlbums.scss';

import { Container, Dimmer, Header, Image, List, Loader } from 'semantic-ui-react';
import { DEFAULT_DIMMABLE } from '../config/components-defaults-config';
import { Models, getModelObjectsFromApi } from '../api-fetching/api-fetching';
import GenericBreadcrumbs from './pure-functional-components/GenericBreadcrumbs';
import PropTypes from 'prop-types';
import React from 'react';
import _ from 'lodash';
import { getAlbumMiniature } from '../utils/mocks';

class ExploreNewAlbums extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isExploreNewAlbumsPageLoading: true,
            listOfAlbumsToPresent: []
        };


    }

    componentDidMount() {
        getModelObjectsFromApi(Models.ALBUM).then(retrievedAlbums => {
            this.setState({
                isExploreNewAlbumsPageLoading: false,
                listOfAlbumsToPresent: retrievedAlbums,
            });
        });
    }

    render() {
        const {
            listOfAlbumsToPresent,
            isExploreNewAlbumsPageLoading
        } = this.state;

        const {
            // listOfAlbumsToPresent,

            goToSongsFeed,
            switchViewToAlbumDetails,
        } = this.props;

        return <Container className="albums-feed-container">
            <Dimmer active={isExploreNewAlbumsPageLoading}>
                <Loader indeterminate size='huge'>
                    Loading song page.
                </Loader>
            </Dimmer>

            <Dimmer.Dimmable  {...DEFAULT_DIMMABLE} dimmed={isExploreNewAlbumsPageLoading}>

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
                            <Image size={'tiny'} avatar src={getAlbumMiniature()}/>
                            <List.Content className='explore-new-album-content'>
                                <List.Header>{albumObject.albumName}</List.Header>
                                <List.Description>
                                    {/*ancv*/}
                                    {albumObject.albumDescription}
                                </List.Description>
                                {/*<span>{albumObject.albumDescription}</span>*/}
                            </List.Content>
                        </List.Item>
                    );
                })}
            </List>

            </Dimmer.Dimmable>
        </Container>;
    }
}

export default ExploreNewAlbums;

ExploreNewAlbums.propTypes = {
    listOfAlbumsToPresent: PropTypes.array,

    goToSongsFeed: PropTypes.func,
    switchViewToAlbumDetails: PropTypes.func,
};