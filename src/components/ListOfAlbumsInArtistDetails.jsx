import { Image, List } from 'semantic-ui-react';
import { getAlbumMiniature } from '../utils/mocks';
import PropTypes from 'prop-types';
import React from 'react';

class ListOfSongsInArtistDetails extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const albumNames = ['Thraxxl Rose', 'Hellboy', 'Cry Baby'];

        const mockedSongs = _.map(albumNames, albumName => {
            return {
                songMiniature: getAlbumMiniature(),
                title: albumName,
            };
        }); // TODO: resolve mock

        return _.map(mockedSongs, mockedSong => {
            return (<List celled>
                <List.Item>
                    <Image avatar src={mockedSong.songMiniature} />
                    <List.Content>
                        <List.Header>{mockedSong.title}</List.Header>
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
    goToSongsFeed: PropTypes.func
};