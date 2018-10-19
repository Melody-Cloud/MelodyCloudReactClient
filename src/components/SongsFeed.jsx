import {
    APPEND_TO_PLAYLIST_BUTTON_PROPS,
    FIRST_COLUMN_PROPS,
    FOURTH_COLUMN_PROPS,
    PAUSE_BUTTON_PROPS, PLAY_BUTTON_PROPS, SECOND_COLUMN_PROPS,
    THIRD_COLUMN_PROPS,
} from '../config/components-defaults-config';
import { Button, Container, Grid, List } from 'semantic-ui-react';
import { WAVEFORM_IMAGE_HEIGHT, WAVEFORM_IMAGE_WIDTH, notyf } from '../config/application-config';
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
        }
    }

    isGivenSongFirstInPlaylist = songObject => {
        return _.isEqual(_.get(this.props, 'musicPlayerRef.current.state.audioLists[0]'), songObject);
    };

    onPlayButtonClicked = songObject => {
        const isThisSongFirstInPlaylist = this.isGivenSongFirstInPlaylist(songObject);
        const isSongAtTheEnd = this.isCurrentSongAlmostAtTheEnd();

        if (!isThisSongFirstInPlaylist || isSongAtTheEnd) {
            const reorderedAudioList = this.getReorderedAudioList(songObject);

            this.props.updateAudioList(reorderedAudioList, true);
        } else {
            const onPlayFunction = _.get(this.props, 'musicPlayerRef.current.onPlay');
            onPlayFunction();
        }
    };

    appendSongToPlaylist = (songObject) => {
        const currentAudioListToBeUpdated = _.clone(this.props.currentAudioList);
        currentAudioListToBeUpdated.push(songObject);
        this.props.updateAudioList(currentAudioListToBeUpdated, false);
        notyf.confirm(`Song ${songObject.name} was added to your playlist`);
    };

    isPlaylistEmpty = () => {
        return _.isEqual(_.size(this.state.audioList), 0);
    };

    getReorderedAudioList = songToBePlayedNow => {
        const newAudioListToBePlayed = _.clone(this.props.currentAudioList);

        const audioListWithDuplicateSongRemoved = _.pull(newAudioListToBePlayed, songToBePlayedNow);
        audioListWithDuplicateSongRemoved.unshift(songToBePlayedNow);

        return newAudioListToBePlayed;
    };

    isCurrentSongAlmostAtTheEnd = () => {
        return _.get(this.props, 'musicPlayerRef.current.state.currentTime') >= Math.floor(_.get(this, 'musicPlayerRef.current.state.duration'));
    };

    render() {
        const {songsInFeed, musicPlayerRef, waveformProgressBarWidth} = this.props;

        const flooredSongDuration = Math.floor(_.get(musicPlayerRef, 'current.state.duration'));
        const currentSongTime = Math.ceil(_.get(musicPlayerRef, 'current.state.currentTime'));

        return <Container className="feed-container" fluid>
            <List id="songs-feed" celled>
                {_.map(songsInFeed, songObject => {
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
                                            onClick={() => {this.appendSongToPlaylist(songObject)}}
                                        />
                                    </Grid.Column>
                                    <Grid.Column {...THIRD_COLUMN_PROPS}>
                                        <WaveformProgress
                                            waveformImageSource={songObject.waveform}
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
    currentAudioList: PropTypes.array,
    songsInFeed: PropTypes.array,
    waveformProgressBarWidth: PropTypes.number,
    updateAudioList: PropTypes.func,
    switchViewToSongDetails: PropTypes.func,
};