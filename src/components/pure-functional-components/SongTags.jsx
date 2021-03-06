import React from 'react';
import _ from 'lodash';

import { Icon, Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const SongTags = ({ songTags }) => {
    return _.map(songTags, tag => {
        return (
            <Label color="green" className="single-tag">
                <Icon name="music" />
                {tag.songTag}
            </Label>
        );
    });
};

export default SongTags;

SongTags.propTypes = {
    songTags: PropTypes.array,
};
