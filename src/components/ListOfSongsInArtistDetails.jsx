import { Image, List } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import React from 'react';

import 'assets/scss/ListOfSongsInArtistDetails.scss';

class ListOfSongsInArtistDetails extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { switchViewToSongDetails, songsCreatedByThisArtist } = this.props;
        // const songNames = ['appetite', 'cobain', 'last thing'];
        //
        // const mockedSongs = _.map(songNames, songName => {
        //     return {
        //         songMiniature: getSongMiniature(),
        //         title: songName,
        //     };
        // }); // TODO: resolve mock

        return _.map(songsCreatedByThisArtist, mockedSong => {
            return (<List celled>
                <List.Item
                    onClick={() => {
                        switchViewToSongDetails(mockedSong)
                    }}
                    className="song-item-in-artist-details"
                >
                    <Image avatar src={mockedSong.songMiniature} />
                    <List.Content>
                        <List.Header>{mockedSong.name}</List.Header>
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
    songsCreatedByThisArtist: PropTypes.array,
    goToSongsFeed: PropTypes.func,
    switchViewToSongDetails: PropTypes.func,
};