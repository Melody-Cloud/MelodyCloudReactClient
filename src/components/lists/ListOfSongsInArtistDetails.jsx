import { Image, List } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import React from 'react';

import 'assets/scss/ListOfSongsInArtistDetails.scss';
import { getSongMiniature } from '../../utils/mocks';
import _ from 'lodash';

class ListOfSongsInArtistDetails extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            switchViewToSongDetails,
            songsCreatedByThisArtist,
        } = this.props;

        return (<List celled>
            {
                _.map(songsCreatedByThisArtist, mockedSong => {
                    return (<List.Item
                        onClick={() => {
                            switchViewToSongDetails(mockedSong);
                        }}
                        className="song-item-in-artist-details"
                    >
                        <Image avatar src={getSongMiniature()}/>
                        <List.Content>
                            <List.Header>{mockedSong.name}</List.Header>
                            <span>An excellent companion</span>
                        </List.Content>
                    </List.Item>);
                })
            }
        </List>);
    }
}

export default ListOfSongsInArtistDetails;

ListOfSongsInArtistDetails.propTypes = {
    songsCreatedByThisArtist: PropTypes.array,
    switchViewToSongDetails: PropTypes.func,
};