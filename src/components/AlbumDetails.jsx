import 'assets/scss/AlbumDetails.scss';

import PropTypes from 'prop-types';
import React from 'react';

import { AESTHETICS_TIMEOUT, notyf } from '../config/application-config';
import { Button, Container, Dimmer, Header, Icon, Image, Loader } from 'semantic-ui-react';
import { DEFAULT_DIMMABLE, PLAY_ALBUM_BUTTON_PROPS } from '../config/components-defaults-config';
import { getAlbumCover } from '../utils/mocks';
import GenericBreadcrumbs from './pure-functional-components/GenericBreadcrumbs';
import ListOfSongsInAlbumDetails from './ListOfSongsInAlbumDetails';

class AlbumDetails extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isAlbumPageLoading: true,
        };
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                isAlbumPageLoading: false,
            });
        }, AESTHETICS_TIMEOUT);
    }

    renderPlayAlbumButton = (size = 'huge') => {
        const {
            albumToDisplay,
            songsInThisAlbum,
            replaceAudioList,
        } = this.props;

        return <Button
            size={size}
            {...PLAY_ALBUM_BUTTON_PROPS}
            onClick={
                () => {
                    notyf.confirm(`Playing album ${albumToDisplay.albumName}`);
                    replaceAudioList(songsInThisAlbum);
                }
            }
        >
            <Icon name='play'/> Play album
        </Button>;
    };

    render() {
        const {
            isAlbumPageLoading,
        } = this.state;

        const {
            albumToDisplay,
            songsInThisAlbum,

            goToSongsFeed,
            switchViewToSongDetails,
            switchViewToArtistDetails,
        } = this.props;

        return (<Container className='album-details-container'>
            <Dimmer active={isAlbumPageLoading}>
                <Loader indeterminate size='huge'>
                    Loading album page.
                </Loader>
            </Dimmer>

            <Dimmer.Dimmable  {...DEFAULT_DIMMABLE} dimmed={isAlbumPageLoading}>

                <GenericBreadcrumbs
                    goToSongsFeed={goToSongsFeed}
                    activeItemLabel={'Album Details'}
                    detailedName={albumToDisplay.albumName}
                />

                <Header as='h3' className='album-author-header txt-center'>
                    by&nbsp;
                    <span
                        onClick={() => {
                            switchViewToArtistDetails(albumToDisplay.artist);
                        }}
                        className='go-to-singer-page'
                    >
                        {albumToDisplay.artist.name}
                    </span>
                </Header>

                <Header as='h2' className='album-title-header txt-center'>{albumToDisplay.albumName}</Header>

                <div className="txt-center play-album-button-wrapper">
                    {this.renderPlayAlbumButton('large')}
                </div>

                <Image
                    className='album-cover'
                    src={getAlbumCover()}
                />

                <Header as='h2' className='album-description'>Description</Header>

                <p className='album-description'>{albumToDisplay.albumDescription}</p>

                <Header as='h3' className='songs-header'>List of songs</Header>

                <ListOfSongsInAlbumDetails
                    songsInThisAlbum={songsInThisAlbum}
                    switchViewToSongDetails={switchViewToSongDetails}
                    // songsCreatedByThisArtist={songsCreatedByThisArtist}
                />

                {this.renderPlayAlbumButton()}

            </Dimmer.Dimmable>
        </Container>);
    }
}

export default AlbumDetails;

AlbumDetails.propTypes = {
    albumToDisplay: PropTypes.object,
    songsInThisAlbum: PropTypes.array,
    goToSongsFeed: PropTypes.func,
    switchViewToSongDetails: PropTypes.func,
    switchViewToArtistDetails: PropTypes.func,
    replaceAudioList: PropTypes.func,
};