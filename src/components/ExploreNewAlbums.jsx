import 'assets/scss/ExploreNewAlbums.scss';

import { AESTHETICS_TIMEOUT } from '../config/application-config';
import { Container, Dimmer, Header, Image, List, Loader } from 'semantic-ui-react';
import { DEFAULT_DIMMABLE } from '../config/components-defaults-config';
import { Models, getModelObjectsFromApi, Columns, getRelatedModelBySongId } from '../api-fetching/api-fetching';
import { getAlbumMiniature, getBarUrl, getCoverUrl, getSongMiniature } from '../utils/mocks';
import GenericBreadcrumbs from './pure-functional-components/GenericBreadcrumbs';
import PropTypes from 'prop-types';
import React from 'react';
import _ from 'lodash';

class ExploreNewAlbums extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loadingMessage: 'Loading freshest albums',

            isExploreNewAlbumsPageLoading: true,
            listOfAlbumsToPresent: [],
        };


    }

    componentDidMount() {
        getModelObjectsFromApi(Models.ALBUM).then(retrievedAlbums => {
            this.setState({
                listOfAlbumsToPresent: retrievedAlbums,
            });

            setTimeout(() => {
                this.setState({
                    isExploreNewAlbumsPageLoading: false,
                });
            }, AESTHETICS_TIMEOUT);
        });
    }

    render() {
        const {
            listOfAlbumsToPresent,
            isExploreNewAlbumsPageLoading,
        } = this.state;

        const {
            // listOfAlbumsToPresent,

            goToSongsFeed,
            switchViewToAlbumDetails,
        } = this.props;

        return <Container className="albums-feed-container">
            <Dimmer active={isExploreNewAlbumsPageLoading}>
                <Loader indeterminate size='huge'>
                    {this.state.loadingMessage}
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
                                    this.setState({
                                        isExploreNewAlbumsPageLoading: true,
                                        loadingMessage: 'Loading album...'
                                    });

                                    getModelObjectsFromApi(Models.ARTIST, {filterColumn: Columns.ID, filterValue:
                                        albumObject.artistId}).then(retrievedArtists => {
                                            return {
                                                ...albumObject,
                                                artist: retrievedArtists[0]
                                            }
                                    }).then(albumWithArtist => {
                                        return getModelObjectsFromApi(Models.SONG, {filterColumn: Columns.ALBUM_ID, filterValue:
                                            albumObject.id}).then(retrievedSongs => {
                                            let songsUpdatedWithTags = _.map(retrievedSongs, song => {
                                                return getRelatedModelBySongId(song.id, Models.TAG).then(retrievedTags => {
                                                    return {
                                                        ...song,
                                                        tags: retrievedTags,
                                                        artist: albumWithArtist.artist,
                                                        singer: albumWithArtist.artist.name,
                                                    };
                                                });
                                            });

                                            return Promise.all(songsUpdatedWithTags);
                                        }).then(songsUpdatedWithTags => {
                                            let songsUpdatedWithComments = _.map(songsUpdatedWithTags, song => {
                                                return getRelatedModelBySongId(song.id, Models.COMMENT).then(retrievedComments => {
                                                    return {
                                                        ...song,
                                                        comments: retrievedComments,
                                                    };
                                                });
                                            });

                                            return Promise.all(songsUpdatedWithComments);
                                        }).then(songsUpdatedWithComments => {
                                            return {
                                                ...albumWithArtist,
                                                songsInsideThisAlbum: songsUpdatedWithComments,
                                            }
                                        });
                                    }).then(albumWithSongs => {
                                        console.dir(albumWithSongs);
                                        switchViewToAlbumDetails(albumWithSongs);
                                    });
                                }}
                            >
                                <Image size={'tiny'} avatar src={getAlbumMiniature()}/>
                                <List.Content className='explore-new-album-content'>
                                    <List.Header>{albumObject.albumName}</List.Header>
                                    <List.Description>
                                        {albumObject.albumDescription}
                                    </List.Description>
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