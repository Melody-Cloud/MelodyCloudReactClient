import { Image, List } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import React from 'react';

import 'assets/scss/ListOfSongsInAlbumDetails.scss';

class ListOfSongsInAlbumDetails extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            switchViewToSongDetails,
            songsInThisAlbum,
        } = this.props;

        return (<List celled>
            {
                _.map(songsInThisAlbum, mockedSong => {
                    return (<List.Item
                        onClick={() => {
                            switchViewToSongDetails(mockedSong);
                        }}
                        className="song-item-in-album-details"
                    >
                        <Image avatar src={mockedSong.songMiniature}/>
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

export default ListOfSongsInAlbumDetails;

ListOfSongsInAlbumDetails.propTypes = {
    songsInThisAlbum: PropTypes.func,
    switchViewToSongDetails: PropTypes.func,
};