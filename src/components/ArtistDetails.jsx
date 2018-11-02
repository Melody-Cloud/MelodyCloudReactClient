import 'assets/scss/ArtistDetails.scss';
import { Breadcrumb, Button, Container, Header, Icon, Image } from 'semantic-ui-react';
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
                <Breadcrumb.Section active>Artist Details</Breadcrumb.Section>
                <Breadcrumb.Divider />
                <Breadcrumb.Section active>{artistToDisplay.name}</Breadcrumb.Section>
            </Breadcrumb>

            <Header as='h2' className='song-title-header txt-center'>{artistToDisplay.name}</Header>

            <Image
                className='artist-avatar'
                src={artistToDisplay.avatar}
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