import 'assets/scss/ListOfAlbumsInArtistDetails.scss';

import { Image, List } from 'semantic-ui-react';
import { getAlbumMiniature } from '../utils/mocks';
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

        const albumNames = ['Thraxxl Rose', 'Hellboy', 'Cry Baby'];

        const mockedAlbums = _.map(albumNames, albumName => {
            return {
                albumMiniature: getAlbumMiniature(),
                title: albumName,
            };
        }); // TODO: resolve mock

        return _.map(mockedAlbums, mockedAlbum => {
            return (<List celled>
                <List.Item
                    onClick={() => {
                        switchViewToAlbumDetails(mockedAlbum)
                    }}
                    className="album-item-in-artist-details"
                >
                    <Image avatar src={mockedAlbum.albumMiniature} />
                    <List.Content>
                        <List.Header>{mockedAlbum.title}</List.Header>
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