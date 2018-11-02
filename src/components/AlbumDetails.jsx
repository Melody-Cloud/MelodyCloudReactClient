import 'assets/scss/AlbumDetails.scss';
import PropTypes from 'prop-types';
import React from 'react';

import { Breadcrumb, Button, Container, Header, Icon, Image } from 'semantic-ui-react';
import ListOfSongsInAlbumDetails from './ListOfSongsInAlbumDetails';

class AlbumDetails extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            goToSongsFeed,
            albumToDisplay,
            songsInThisAlbum
        } = this.props;

        return (<Container className='album-details-container'>
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
                <Breadcrumb.Section active>Album Details</Breadcrumb.Section>
                <Breadcrumb.Divider />
                <Breadcrumb.Section active>{albumToDisplay.title}</Breadcrumb.Section>
            </Breadcrumb>

            <Header as='h2' className='album-title-header txt-center'>{albumToDisplay.title}</Header>

            <Image
                className='artist-avatar'
                src={albumToDisplay.albumMiniature}
            />

            <Header as='h3' className='artist-about'>Description</Header>

            <p className='album-description'>Here goes description</p>

            <Header as='h3' className='songs-header'>Songs</Header>

            <ListOfSongsInAlbumDetails
                songsInThisAlbum={songsInThisAlbum}
                // switchViewToSongDetails={switchViewToSongDetails}
                // songsCreatedByThisArtist={songsCreatedByThisArtist}
            />
        </Container>);
    }
}

export default AlbumDetails;

AlbumDetails.propTypes = {
    albumToDisplay: PropTypes.object,
    songsInThisAlbum: PropTypes.array,
    goToSongsFeed: PropTypes.func,
    switchViewToSongDetails: PropTypes.func,
};