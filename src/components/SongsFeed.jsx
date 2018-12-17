import {
    APPEND_TO_PLAYLIST_BUTTON_PROPS,
    FIRST_COLUMN_PROPS,
    FOURTH_COLUMN_PROPS,
    PAUSE_BUTTON_PROPS, PLAY_BUTTON_PROPS, SECOND_COLUMN_PROPS,
    THIRD_COLUMN_PROPS,
} from '../config/components-defaults-config';
import { Button, Container, Dimmer, Grid, List, Loader } from 'semantic-ui-react';
import { WAVEFORM_IMAGE_HEIGHT, WAVEFORM_IMAGE_WIDTH } from '../config/application-config';
import { WaveformProgress } from './WaveformProgress';
import PropTypes from 'prop-types';
import React from 'react';
import SongCard from './pure-functional-components/SongCard';
import SongTags from './pure-functional-components/SongTags';
import _ from 'lodash';


class SongsFeed extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    isGivenSongFirstInPlaylist = songObject => {
        return _.isEqual(_.get(this.props, 'musicPlayerRef.current.state.audioLists[0]'), songObject);
    };

    onPlayButtonClicked = songObject => {
        const isThisSongFirstInPlaylist = this.isGivenSongFirstInPlaylist(songObject);
        const isSongAtTheEnd = this.isCurrentSongAlmostAtTheEnd();

        if (!isThisSongFirstInPlaylist || isSongAtTheEnd) {
            this.props.playSongInPlayer(songObject);
        } else {
            const onPlayFunction = _.get(this.props, 'musicPlayerRef.current.onPlay');
            onPlayFunction();
        }
    };

    isCurrentSongAlmostAtTheEnd = () => {
        return _.get(this.props, 'musicPlayerRef.current.state.currentTime') >= Math.floor(_.get(this, 'musicPlayerRef.current.state.duration'));
    };

    render() {
        const {songsInFeed, musicPlayerRef, waveformProgressBarWidth, appendSongToPlaylist, areSongsLoadingFromApi, songsFilter} = this.props;

        const flooredSongDuration = Math.floor(_.get(musicPlayerRef, 'current.state.duration'));
        const currentSongTime = Math.ceil(_.get(musicPlayerRef, 'current.state.currentTime'));

        const filteredSongs = _.filter(songsInFeed, song => {
            return _.includes(_.lowerCase(song.name), _.lowerCase(songsFilter));
        });

        return <Container className="songs-feed-container" fluid>
            <Dimmer active={areSongsLoadingFromApi}>
                <Loader indeterminate size='huge'>
                    Loading new songs for you.
                </Loader>
            </Dimmer>

            <List id="songs-feed" celled>
                {_.map(filteredSongs, songObject => {
                    const isThisSongOnTopOfPlaylist = this.isGivenSongFirstInPlaylist(songObject);

                    const isAnySongPlaying = this.props.songPlaying;

                    return (
                        <List.Item className="single-song-item">
                            <List.Content>
                                <Grid className="middle aligned" style={{ alignItems: 'center' }} stackable>
                                    <Grid.Column {...FIRST_COLUMN_PROPS}>
                                        <SongCard
                                            songObject={songObject}
                                            switchViewToSongDetails={() => {
                                                this.props.switchViewToSongDetails(songObject)
                                            }}
                                            switchViewToArtistDetails={() => {
                                                this.props.switchViewToArtistDetails(songObject.artist)
                                            }}
                                        />
                                    </Grid.Column>
                                    <Grid.Column {...SECOND_COLUMN_PROPS}>
                                        {isThisSongOnTopOfPlaylist && isAnySongPlaying ? (
                                            <Button
                                                {...PAUSE_BUTTON_PROPS}
                                                onClick={() => {
                                                    const pauseAudioFunction = _.get(musicPlayerRef, 'current._pauseAudio');
                                                    pauseAudioFunction();
                                                }}
                                            />
                                        ) : (
                                            <Button
                                                {...PLAY_BUTTON_PROPS}
                                                onClick={() => {
                                                    this.onPlayButtonClicked(songObject);
                                                }}
                                            />
                                        )}
                                        <Button
                                            {...APPEND_TO_PLAYLIST_BUTTON_PROPS}
                                            onClick={() => {appendSongToPlaylist(songObject)}}
                                        />
                                    </Grid.Column>
                                    <Grid.Column {...THIRD_COLUMN_PROPS}>
                                        <WaveformProgress
                                            waveformImageSource={songObject.waveformImgUrl}
                                            imageWidth={WAVEFORM_IMAGE_WIDTH}
                                            imageHeight={WAVEFORM_IMAGE_HEIGHT}
                                            waveformProgressBarWidth={waveformProgressBarWidth}
                                            animationDuration={flooredSongDuration - currentSongTime}
                                            isAnimationEnabled={isAnySongPlaying}
                                            isActive={isThisSongOnTopOfPlaylist}
                                        />
                                    </Grid.Column>
                                    <Grid.Column {...FOURTH_COLUMN_PROPS}>
                                        <div className="song-tags-wrapper">
                                            <SongTags
                                                songTags={songObject.tags}
                                                // songTags={songIdToTagsMapping[songObject.id]}
                                            />
                                        </div>
                                    </Grid.Column>
                                </Grid>
                            </List.Content>
                        </List.Item>
                    );
                })}
            </List>
        </Container>;
    }
}

export default SongsFeed;

SongsFeed.propTypes = {
    musicPlayerRef: PropTypes.object,
    areSongsLoadingFromApi: PropTypes.bool,
    songsFilter: PropTypes.string,
    songsInFeed: PropTypes.array,
    waveformProgressBarWidth: PropTypes.number,
    switchViewToSongDetails: PropTypes.func,
    switchViewToArtistDetails: PropTypes.func,
    appendSongToPlaylist: PropTypes.func,
    playSongInPlayer: PropTypes.func,
};