import 'assets/scss/ListOfPlaylists.scss';

import {
    Columns,
    Models,
    getModelObjectsFromApi,
} from '../api-fetching/api-fetching';
import { Container, Dimmer, Header, List, Loader } from 'semantic-ui-react';
import { DEFAULT_DIMMABLE } from '../config/components-defaults-config';
import { availableColors, HOW_MANY_SONGS_TO_DISPLAY_IN_PLAYLIST_PREVIEW } from '../config/application-config';
import GenericBreadcrumbs from './pure-functional-components/GenericBreadcrumbs';
import Label from 'semantic-ui-react/dist/es/elements/Label/Label';
import PropTypes from 'prop-types';
import React from 'react';
import _ from 'lodash';

class ListOfPlaylists extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            listOfPlaylistsToDisplay: [],
            arePlaylistsLoadingFromApi: true,
        };

        this.listOfColors = availableColors;
    }

    componentDidMount() {
        getModelObjectsFromApi(Models.PLAYLISTS).then(playlistNames => {
            let playlistsWithSongIds = _.map(playlistNames, playlistName => {
                return getModelObjectsFromApi(Models.PLAYLIST, {
                    filterColumn: Columns.PLAYLIST_NAME,
                    filterValue: playlistName,
                }).then(retrievedSongIds => {
                    const songIdsExtracted = _.map(retrievedSongIds, retrievedSongId => {
                        return retrievedSongId.songId;
                    });

                    return getModelObjectsFromApi(Models.SONG, {
                        filterColumn: Columns.ID_IN,
                        filterValue: _.join(songIdsExtracted, ','),
                    }).then(songsUnderThisPlaylist => {
                        return {
                            playlistName: playlistName,
                            songsInsidePlaylist: songsUnderThisPlaylist,
                        };
                    });
                });
            });

            return Promise.all(playlistsWithSongIds);
        }).then(playlistsWithSongs => {
            console.log('over');

            this.setState({
                listOfPlaylistsToDisplay: playlistsWithSongs,
                arePlaylistsLoadingFromApi: false,
            });
        });
    }

    render() {
        const {
            listOfPlaylistsToDisplay,
            arePlaylistsLoadingFromApi,
        } = this.state;

        const {
            goToSongsFeed,
            switchViewToPlaylist,
        } = this.props;

        const isDimmerActive = arePlaylistsLoadingFromApi? arePlaylistsLoadingFromApi: false;

        return <Container className="playlist-view-container">
            <Dimmer active={isDimmerActive}>
                <Loader indeterminate size='huge'>
                    Loading playlists.
                </Loader>
            </Dimmer>

            <Dimmer.Dimmable  {...DEFAULT_DIMMABLE} dimmed={isDimmerActive}>

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
                                    switchViewToPlaylist(playlistObject);
                                }}
                            >
                                <Label as='a' color={this.listOfColors[index]}
                                       ribbon>{playlistObject.playlistName}</Label>
                                {/*<Image avatar src={playlistObject.playlistMiniature}/>*/}
                                <List ordered>
                                    {_.map(songsInsidePlaylistUpTo5, singleSong => {
                                        return <List.Item>
                                            {singleSong.name}
                                        </List.Item>;
                                    })}
                                    <List.Item>...</List.Item>
                                </List>
                            </List.Item>
                        );
                    })}
                </List>

            </Dimmer.Dimmable>
        </Container>;
    }
}

export default ListOfPlaylists;

ListOfPlaylists.propTypes = {
    listOfPlaylistsToDisplay: PropTypes.array,

    goToSongsFeed: PropTypes.func,
    switchViewToPlaylist: PropTypes.func,
};