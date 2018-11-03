import 'assets/scss/ListOfAlbumsInArtistDetails.scss';

import { Image, List } from 'semantic-ui-react';
import { getMockedAlbums } from '../utils/mocks';
import PropTypes from 'prop-types';
import React from 'react';

class ListOfSongsInArtistDetails extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            switchViewToAlbumDetails
        } = this.props;

        return _.map(getMockedAlbums(), mockedAlbum => {
            return (<List celled>
                <List.Item
                    onClick={() => {
                        switchViewToAlbumDetails(mockedAlbum)
                    }}
                    className="album-item-in-artist-details"
                >
                    <Image avatar src={mockedAlbum.albumMiniature} />
                    <List.Content>
                        <List.Header>{mockedAlbum.albumName}</List.Header>
                        <span>An excellent companion</span>
                    </List.Content>
                </List.Item>
            </List>);
        });
    }
}

export default ListOfSongsInArtistDetails;

ListOfSongsInArtistDetails.propTypes = {
    songToDisplay: PropTypes.object,

    goToSongsFeed: PropTypes.func,
    switchViewToAlbumDetails: PropTypes.func
};