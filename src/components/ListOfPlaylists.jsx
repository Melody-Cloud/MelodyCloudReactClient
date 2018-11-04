import 'assets/scss/ListOfPlaylists.scss';

import { Container, Header, Image, List } from 'semantic-ui-react';
import GenericBreadcrumbs from './pure-functional-components/GenericBreadcrumbs';
import PropTypes from 'prop-types';
import React from 'react';
import _ from 'lodash';
import Label from 'semantic-ui-react/dist/es/elements/Label/Label';
import { HOW_MANY_SONGS_TO_DISPLAY_IN_PLAYLIST_PREVIEW } from '../config/application-config';

class ListOfPlaylists extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.listOfColors = [
            'red',
            'orange',
            'yellow',
            'olive',
            'green',
            'teal',
            'blue',
            'violet',
            'purple',
            'pink',
            'brown',
            'grey',
            'black',
        ];
    }

    render() {
        const {
            goToSongsFeed,
            listOfPlaylistsToDisplay,
            switchViewToPlaylist
        } = this.props;

        return <Container className="playlist-view-container">
            <GenericBreadcrumbs
                activeItemLabel='My playlists'
                goToSongsFeed={goToSongsFeed}
            />

            <Header as='h2' className='my-playlists-header txt-center'>My playlists</Header>

            <List
                id="list-of-playlists"
                size={'huge'}
                celled
            >
                {_.map(listOfPlaylistsToDisplay, (playlistObject, index) => {
                    const songsInsidePlaylist = _.get(playlistObject, 'songsInsidePlaylist');
                    const songsInsidePlaylistUpTo5 =
                        _.slice(songsInsidePlaylist, 0, HOW_MANY_SONGS_TO_DISPLAY_IN_PLAYLIST_PREVIEW);

                    return (
                        <List.Item
                            className="single-album-item-in-explore-new-albums"
                            onClick={() => {
                                switchViewToPlaylist(playlistObject)
                            }}
                        >
                            <Label as='a' color={this.listOfColors[index]} ribbon>{playlistObject.playlistName}</Label>
                            {/*<Image avatar src={playlistObject.playlistMiniature}/>*/}
                            <List ordered>
                                {_.map(songsInsidePlaylistUpTo5, singleSong => {
                                    return <List.Item>{singleSong.name}</List.Item>;
                                })}
                                <List.Item>...</List.Item>
                            </List>
                        </List.Item>
                    );
                })}
            </List>
        </Container>;
    }
}

export default ListOfPlaylists;

ListOfPlaylists.propTypes = {
    listOfPlaylistsToDisplay: PropTypes.array,

    goToSongsFeed: PropTypes.func,
    switchViewToPlaylist: PropTypes.func,
};