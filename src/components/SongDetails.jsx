import 'assets/scss/SongDetails.scss';
import {
     APPEND_TO_PLAYLIST_BUTTON_SONG_DETAILS_PROPS, MEDIUM_PLAY_BUTTON_PROPS,
} from '../config/components-defaults-config';
import { Button, Container, Header, Image } from 'semantic-ui-react';
import CommentSection from './CommentSection';
import GenericBreadcrumbs from './pure-functional-components/GenericBreadcrumbs';
import PropTypes from 'prop-types';
import React from 'react';
import SongTags from './pure-functional-components/SongTags';
import _ from 'lodash';
import faker from 'faker';

class SongDetails extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {songToDisplay, goToSongsFeed, switchViewToArtistDetails, appendSongToPlaylist, playSongInPlayer} = this.props;

        return <div className="song-details-page">
            <Container className='song-details-container'>
                <GenericBreadcrumbs
                    goToSongsFeed={goToSongsFeed}
                    activeItemLabel={'Song Details'}
                    detailedName={songToDisplay.name}
                />
                <Header as='h3' className='song-author-header txt-center'>
                    by&nbsp;
                    <span
                        onClick={() => {
                            switchViewToArtistDetails(songToDisplay.artist)
                        }}
                        className='go-to-singer-page'
                    >
                        {songToDisplay.singer}
                    </span>
                </Header>
                <Header as='h2' className='song-title-header txt-center'>{songToDisplay.name}</Header>
                <div className='control-buttons-in-song-details txt-center'>
                    <Button
                        {...MEDIUM_PLAY_BUTTON_PROPS}
                        onClick={() => {
                            playSongInPlayer(songToDisplay);
                        }}
                    />
                    <Button
                        {...APPEND_TO_PLAYLIST_BUTTON_SONG_DETAILS_PROPS}
                        onClick={() => {appendSongToPlaylist(songToDisplay)}}
                    />
                </div>
                <Image
                    className='song-cover'
                    src={songToDisplay.cover}
                />

                <Header as='h4' className='description-header'>Description</Header>

                <p className='song-description'>{songToDisplay.description}</p>

                <Header as='h4' className='lyrics-header'>Lyrics</Header>

                <pre className='song-lyrics'>
                    {faker.lorem.lines(16)}
                </pre>

                <Header as='h4' className='tags-header'>Tags</Header>

                <div className="song-tags">
                    <SongTags
                        songTags={songToDisplay.tags}
                    />
                </div>

                <hr className='divider'/>
                <CommentSection
                    comments={songToDisplay.comments}
                />
            </Container>
        </div>;
    }
}

export default SongDetails;

SongDetails.propTypes = {
    songToDisplay: PropTypes.object,
    goToSongsFeed: PropTypes.func,
    switchViewToArtistDetails: PropTypes.func,
    appendSongToPlaylist: PropTypes.func,
    playSongInPlayer: PropTypes.func,
};