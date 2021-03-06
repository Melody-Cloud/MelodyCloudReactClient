import React from 'react';

import { Card, Icon, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import 'assets/scss/SongCard.scss';
import { getBarUrl } from '../../utils/mocks';

const SongCard = ({ songObject, switchViewToSongDetails, switchViewToArtistDetails }) => {
    return (
        <Card color="green">
            <Image
                src={getBarUrl()}
                onClick={switchViewToSongDetails}
                className='song-card-bar-image'
            />
            <Card.Content>
                <Card.Header>
                    <span
                        className="song-title"
                        onClick={switchViewToSongDetails}
                    >
                        {songObject.name}
                    </span>
                    <span
                        className="song-show-more-info"
                        onClick={switchViewToSongDetails}
                    >
                        (<Icon name="chain" />
                        details)
                    </span>
                </Card.Header>
                <Card.Description>
                    <div className='description ellipsis' title={songObject.description}>
                        {songObject.description}
                    </div>
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <span className="date">
                    <span
                        className="song-show-artist-details"
                        onClick={switchViewToArtistDetails}
                    >
                        <Icon name="user" />
                        {songObject.artist.name}
                    </span>
                </span>
            </Card.Content>
            <Card.Content extra>
                <span className="date">
                    <Icon name="play" />
                    {songObject.amountOfPlays} plays
                </span>
            </Card.Content>
            <Card.Content extra>
                <span className="date">
                    <Icon name="thumbs up outline" />
                    {songObject.amountOfLikes} likes
                </span>
            </Card.Content>
        </Card>
    );
};

export default SongCard;

SongCard.propTypes = {
    songObject: PropTypes.object,
    switchViewToSongDetails: PropTypes.func,
    switchViewToArtistDetails: PropTypes.func,
};
