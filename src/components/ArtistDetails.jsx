import 'assets/scss/ArtistDetails.scss';
import {  Container, Header, Image } from 'semantic-ui-react';
import GenericBreadcrumbs from './pure-functional-components/GenericBreadcrumbs';
import ListOfAlbumsInArtistDetails from './ListOfAlbumsInArtistDetails';
import ListOfSongsInArtistDetails from './ListOfSongsInArtistDetails';
import PropTypes from 'prop-types';
import React from 'react';

class ArtistDetails extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            goToSongsFeed,
            artistToDisplay,
            songsCreatedByThisArtist,
            switchViewToSongDetails,
            switchViewToAlbumDetails
        } = this.props;

        return <Container className='song-details-container'>
            <GenericBreadcrumbs
                activeItemLabel={'Artist details'}
                goToSongsFeed={goToSongsFeed}
                detailedName={artistToDisplay.name}
            />

            <Header as='h2' className='song-title-header txt-center'>{artistToDisplay.name}</Header>

            <Image
                className='artist-avatar'
                src={artistToDisplay.artistImageUrl}
                size={'large'}
                circular
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
            />
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