import 'assets/scss/SinglePlaylistView.scss';

import PropTypes from 'prop-types';
import React from 'react';

import { Button, Container, Header, Icon, Image, List } from 'semantic-ui-react';
import { PLAY_ALBUM_BUTTON_PROPS } from '../config/components-defaults-config';
import { jinkieMockSongs } from '../utils/mocks';
import { notyf } from '../config/application-config';
import GenericBreadcrumbs from './pure-functional-components/GenericBreadcrumbs';
import HugeCelledList from './pure-functional-components/HugeCelledList';
import Sortable from 'react-sortablejs';
import _ from 'lodash';

class SinglePlaylistView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            songsInPlaylist: jinkieMockSongs
        };
    }

    render() {
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
                <Image avatar src={songInPlaylist.songMiniature}/>
                <List.Content>
                    <List.Header>{songInPlaylist.name}</List.Header>
                    <span>An excellent companion</span>
                </List.Content>
            </List.Item>);
        });

        return (<Container className='playlist-details-container'>
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
                            return _.find(songsInPlaylist, { id: parseInt(orderId) })
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
                        replaceAudioList(this.state.songsInPlaylist)
                    }
                }
            >
                <Icon name='play' /> Play this playlist
            </Button>


        </Container>);
    }
}

export default SinglePlaylistView;

SinglePlaylistView.propTypes = {
    playlistToDisplay: PropTypes.object,

    goToSongsFeed: PropTypes.func,
    switchViewToSongDetails: PropTypes.func,
    replaceAudioList: PropTypes.func,
};