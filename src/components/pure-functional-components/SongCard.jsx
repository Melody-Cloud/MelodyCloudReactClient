import React from 'react';
import _ from 'lodash';

import { Card, Icon, Image, Popup } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const SongCard = ({ songObject }) => {
    return (
        <Card color="green">
            <Image src={_.get(songObject, 'cover')} />
            <Card.Content>
                <Card.Header>
                    <span className="name">{_.get(songObject, 'name')}</span>
                    <a className="song-show-more-info" href="/">
                        (<Icon name="chain" />
                        details)
                    </a>
                </Card.Header>
                <Card.Description>
                    <Popup
                        trigger={<a href="/">Click to display song description</a>}
                        content="Add users to your feed"
                        position="bottom left"
                        on="click"
                    />
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <span className="date">
                    <Icon name="user" />
                    {_.get(songObject, 'singer')}
                </span>
            </Card.Content>
            <Card.Content extra>
                <span className="date">
                    <Icon name="play" />
                    {_.get(songObject, 'amountOfPlays')} plays
                </span>
            </Card.Content>
            <Card.Content extra>
                <span className="date">
                    <Icon name="thumbs up outline" />
                    {_.get(songObject, 'amountOfLikes')} likes
                </span>
            </Card.Content>
        </Card>
    );
};

export default SongCard;

SongCard.propTypes = {
    songObject: PropTypes.object,
};
