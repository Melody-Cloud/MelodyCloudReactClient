import 'assets/scss/ArtistDetails.scss';
import { AESTHETICS_TIMEOUT } from '../config/application-config';
import { Columns, Models, getModelObjectsFromApi, getRelatedModelBySongId } from '../api-fetching/api-fetching';
import { Container, Dimmer, Header, Image, Loader } from 'semantic-ui-react';
import { DEFAULT_AVATAR, DEFAULT_DIMMABLE } from '../config/components-defaults-config';
import { getCoverUrl } from '../utils/mocks';
import GenericBreadcrumbs from './pure-functional-components/GenericBreadcrumbs';
import ListOfAlbumsInArtistDetails from './ListOfAlbumsInArtistDetails';
import ListOfSongsInArtistDetails from './ListOfSongsInArtistDetails';
import PropTypes from 'prop-types';
import React from 'react';
import _ from 'lodash';

class ArtistDetails extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isArtistPageLoading: true,

            songsCreatedByThisArtist: [],
            albumsCreatedByThisArtist: [],
        };
    }

    componentDidMount() {
        const {
            artistToDisplay
        } = this.props;

        getModelObjectsFromApi(Models.SONG, {
            filterColumn: Columns.ARTIST_ID,
            filterValue: artistToDisplay.id,
        }).then(retrievedSongs => {
            let songsUpdatedWithArtists = _.map(retrievedSongs, song => {
                return getModelObjectsFromApi(Models.ARTIST, {
                    filterColumn: Columns.ID,
                    filterValue: song.artistId,
                }).then(retrievedArtist => {
                    return {
                        ...song,
                        artist: retrievedArtist[0],
                        singer: retrievedArtist[0].name,

                        cover: getCoverUrl(), // TODO: remove this mocks
                    };
                });
            });

            return Promise.all(songsUpdatedWithArtists);
        }).then(songsUpdatedWithArtists => {
            let songsUpdatedWithTags = _.map(songsUpdatedWithArtists, song => {
                return getRelatedModelBySongId(song.id, Models.TAG).then(retrievedTags => {
                    return {
                        ...song,
                        tags: retrievedTags,
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
            console.dir(songsUpdatedWithComments);

            this.setState({
                songsCreatedByThisArtist: songsUpdatedWithComments,
            });

            setTimeout(() => {
                this.setState({
                    isArtistPageLoading: false,
                });
            }, AESTHETICS_TIMEOUT);
        });

        getModelObjectsFromApi(Models.ALBUM, {
            filterColumn: Columns.ARTIST_ID,
            filterValue: artistToDisplay.id,
        }).then(retrievedAlbums => {
            let updatedAlbums = _.map(retrievedAlbums, albumObject => {
                return getModelObjectsFromApi(Models.SONG, {filterColumn: Columns.ALBUM_ID, filterValue:
                    albumObject.id}).then(retrievedSongs => {
                    let songsUpdatedWithTags = _.map(retrievedSongs, song => {
                        return getRelatedModelBySongId(song.id, Models.TAG).then(retrievedTags => {
                            return {
                                ...song,
                                tags: retrievedTags,
                                artist: artistToDisplay,
                                singer: artistToDisplay.name,
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
                        ...albumObject,
                        artist: artistToDisplay,
                        songsInsideThisAlbum: songsUpdatedWithComments,
                    }
                });
            });

            return Promise.all(updatedAlbums);
        }).then(filledAlbums => {
            this.setState({
                albumsCreatedByThisArtist: filledAlbums
            });
        });
    }

    render() {
        const {
            goToSongsFeed,
            artistToDisplay,
            switchViewToSongDetails,
            switchViewToAlbumDetails
        } = this.props;

        const {
            isArtistPageLoading,
            albumsCreatedByThisArtist,
            songsCreatedByThisArtist
        } = this.state;

        return <Container className='song-details-container'>
            <Dimmer active={isArtistPageLoading}>
                <Loader indeterminate size='huge'>
                    Loading artist page.
                </Loader>
            </Dimmer>

            <Dimmer.Dimmable {...DEFAULT_DIMMABLE} dimmed={isArtistPageLoading}>
                <GenericBreadcrumbs
                    activeItemLabel={'Artist details'}
                    goToSongsFeed={goToSongsFeed}
                    detailedName={artistToDisplay.name}
                />

                <Header as='h2' className='song-title-header txt-center'>{artistToDisplay.name}</Header>

                <Image
                    src={artistToDisplay.artistImageUrl}
                    {...DEFAULT_AVATAR}
                />

                <Header as='h3' className='artist-about'>About {artistToDisplay.name}</Header>

                <p className='artist-description'>{artistToDisplay.artistDescription}</p>

                <Header as='h3' className='popular-songs-header'>Popular {artistToDisplay.name} songs</Header>

                <ListOfSongsInArtistDetails
                    switchViewToSongDetails={switchViewToSongDetails}
                    songsCreatedByThisArtist={songsCreatedByThisArtist}
                />

                <Header as='h3' className='albums-header'>Artist albums</Header>

                <ListOfAlbumsInArtistDetails
                    switchViewToAlbumDetails={switchViewToAlbumDetails}
                    albumsCreatedByThisArtist={albumsCreatedByThisArtist}
                />
            </Dimmer.Dimmable>


        </Container>;
    }
}

export default ArtistDetails;

ArtistDetails.propTypes = {
    artistToDisplay: PropTypes.object,
    songsCreatedByThisArtist: PropTypes.array,

    goToSongsFeed: PropTypes.func,
    switchViewToSongDetails: PropTypes.func,
    switchViewToAlbumDetails: PropTypes.func,
};