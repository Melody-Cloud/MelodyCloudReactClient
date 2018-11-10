import 'assets/scss/SinglePlaylistView.scss';

import PropTypes from 'prop-types';
import React from 'react';

import { Button, Container, Dimmer, Header, Icon, Image, List, Loader } from 'semantic-ui-react';
import { Columns, Models, getModelObjectsFromApi, getRelatedModelBySongId } from '../api-fetching/api-fetching';
import { DEFAULT_DIMMABLE, PLAY_ALBUM_BUTTON_PROPS } from '../config/components-defaults-config';
import { getCoverUrl, getSongMiniature } from '../utils/mocks';
import { notyf } from '../config/application-config';
import GenericBreadcrumbs from './pure-functional-components/GenericBreadcrumbs';
import HugeCelledList from './pure-functional-components/HugeCelledList';
import Sortable from 'react-sortablejs';
import _ from 'lodash';

class SinglePlaylistView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            songsInPlaylist: [],
            isPlaylistLoading: true,
        };
    }

    componentDidMount() {
        getModelObjectsFromApi(Models.SONG).then(retrievedSongs => {
            let songsUpdatedWithArtists = _.map(retrievedSongs, song => {
                return getModelObjectsFromApi(Models.ARTIST, {
                    filterColumn: Columns.ID,
                    filterValue: song.artistId,
                }).then(retrievedArtist => {
                    return {
                        ...song,
                        artist: retrievedArtist[0],
                        singer: retrievedArtist[0].name,

                        cover: getCoverUrl(),
                    };
                });
            });

            return Promise.all(songsUpdatedWithArtists);
        }).then(songsUpdatedWithArtists => {
            let songsUpdatedWithTags = _.map(songsUpdatedWithArtists, song => {
                return getRelatedModelBySongId(song.id, Models.TAG).then(retrievedTags => {
                    return {
                        ...song,
                        tags: retrievedTags,
                    };
                });
            });

            return Promise.all(songsUpdatedWithTags);
        }).then(songsUpdatedWithTags => {
            let songsUpdatedWithComments = _.map(songsUpdatedWithTags, song => {
                return getRelatedModelBySongId(song.id, Models.COMMENT).then(retrievedComments => {
                    return {
                        ...song,
                        comments: retrievedComments,
                    };
                });
            });

            return Promise.all(songsUpdatedWithComments);
        }).then(songsUpdatedWithComments => {
            this.setState({
                isPlaylistLoading: false,
                songsInPlaylist: songsUpdatedWithComments,
            });
        });
    }

    render() {
        const {
            isPlaylistLoading,
        } = this.state;

        const {
            playlistToDisplay,

            goToSongsFeed,
            switchViewToSongDetails,
            replaceAudioList,
        } = this.props;

        const items = this.state.songsInPlaylist.map(songInPlaylist => {
            return (<List.Item
                key={_.uniqueId()}
                data-id={songInPlaylist.id}
                onClick={() => {
                    switchViewToSongDetails(songInPlaylist);
                }}
                className="song-item-in-album-details"
            >
                <Image avatar src={getSongMiniature()}/>
                <List.Content>
                    <List.Header>{songInPlaylist.name}</List.Header>
                    <span>{songInPlaylist.description}</span>
                </List.Content>
            </List.Item>);
        });

        return <Container className='playlist-details-container'>
            <Dimmer active={isPlaylistLoading}>
                <Loader indeterminate size='huge'>
                    Loading playlists.
                </Loader>
            </Dimmer>

            <Dimmer.Dimmable  {...DEFAULT_DIMMABLE} dimmed={isPlaylistLoading}>

                <GenericBreadcrumbs
                    goToSongsFeed={goToSongsFeed}
                    activeItemLabel={'Playlist Details'}
                    detailedName={playlistToDisplay.playlistName}
                />

                <Header as='h3' className='playlist-name-header txt-center'>
                    {playlistToDisplay.playlistName}
                </Header>


                <div className="sortable-wrapper">
                    <Sortable
                        tag={HugeCelledList}
                        onChange={(order, sortable, evt) => {
                            const songsInPlaylist = this.state.songsInPlaylist;

                            const resortedPlaylist = _.map(order, orderId => {
                                return _.find(songsInPlaylist, { id: parseInt(orderId) });
                            });

                            this.setState({ songsInPlaylist: resortedPlaylist });
                        }}
                    >
                        {items}
                    </Sortable>
                </div>

                <Button
                    size={'huge'}
                    {...PLAY_ALBUM_BUTTON_PROPS}
                    onClick={
                        () => {
                            notyf.confirm(`Playing playlist ${playlistToDisplay.playlistName}`);
                            replaceAudioList(this.state.songsInPlaylist);
                        }
                    }
                >
                    <Icon name='play'/> Play this playlist
                </Button>

            </Dimmer.Dimmable>
        </Container>;
    }
}

export default SinglePlaylistView;

SinglePlaylistView.propTypes = {
    playlistToDisplay: PropTypes.object,

    goToSongsFeed: PropTypes.func,
    switchViewToSongDetails: PropTypes.func,
    replaceAudioList: PropTypes.func,
};