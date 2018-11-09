import 'assets/scss/ArtistDetails.scss';
import { AESTHETICS_TIMEOUT } from '../config/application-config';
import { Container, Dimmer, Header, Image, Loader, Segment } from 'semantic-ui-react';
import GenericBreadcrumbs from './pure-functional-components/GenericBreadcrumbs';
import ListOfAlbumsInArtistDetails from './ListOfAlbumsInArtistDetails';
import ListOfSongsInArtistDetails from './ListOfSongsInArtistDetails';
import PropTypes from 'prop-types';
import React from 'react';
import { DEFAULT_AVATAR, DEFAULT_DIMMABLE } from '../config/components-defaults-config';

class ArtistDetails extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isArtistPageLoading: true,
        };

        setTimeout(() => {
            this.setState({
                isArtistPageLoading: false,
            });
        }, AESTHETICS_TIMEOUT);
    }

    render() {
        const {
            goToSongsFeed,
            artistToDisplay,
            songsCreatedByThisArtist,
            switchViewToSongDetails,
            switchViewToAlbumDetails
        } = this.props;

        const {
            isArtistPageLoading
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