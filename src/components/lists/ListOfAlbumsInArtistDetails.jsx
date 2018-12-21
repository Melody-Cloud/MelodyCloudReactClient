import 'assets/scss/ListOfAlbumsInArtistDetails.scss';

import { Image, List } from 'semantic-ui-react';
import { getAlbumMiniature } from '../../utils/mocks';
import PropTypes from 'prop-types';
import React from 'react';
import _ from 'lodash';

class ListOfSongsInArtistDetails extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            albumsCreatedByThisArtist,
            switchViewToAlbumDetails,
        } = this.props;

        return (<List celled>
            {
                _.map(albumsCreatedByThisArtist, album => {
                    return (
                        <List.Item
                            onClick={() => {
                                switchViewToAlbumDetails(album);
                            }}
                            className="album-item-in-artist-details"
                        >
                            <Image avatar src={getAlbumMiniature()}/>
                            <List.Content>
                                <List.Header>{album.albumName}</List.Header>
                                <span>{album.albumDescription}</span>
                            </List.Content>
                        </List.Item>);
                })
            }
        </List>);
    }
}

export default ListOfSongsInArtistDetails;

ListOfSongsInArtistDetails.propTypes = {
    albumsCreatedByThisArtist: PropTypes.array,

    goToSongsFeed: PropTypes.func,
    switchViewToAlbumDetails: PropTypes.func,
};