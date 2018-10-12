import 'assets/scss/MainScreen.scss';
import 'react-jinke-music-player/assets/index.css';

import _ from 'lodash';

import React from 'react';

import ReactJkMusicPlayer from 'react-jinke-music-player';

import {
    JK_MUSIC_PLAYER_DEFAULT_SETTINGS,
} from '../config/components-defaults-config';
import { WAVEFORM_IMAGE_WIDTH } from '../config/application-config';
import { getUiid } from '../utils/mocks';
import { isArrayEmpty } from '../utils/common-utils';
import Nav from './pure-functional-components/Nav';
import SongsFeed from './SongsFeed';

class MainScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            //SongsFeed
            waveformProgressBarWidth: 0,
            audioList: [],
            songPlaying: false,

            playerUiid: ''
        };

        this.musicPlayerRef = React.createRef();
    }

    calculateProgressBarWidth = () => {
        if (!this.musicPlayerRef.current || !this.musicPlayerRef.current.state || _.isEqual(this.musicPlayerRef.current.state.currentTime, 0)) {
            return 0;
        }
        return (
            (_.get(this, 'musicPlayerRef.current.state.currentTime') / _.get(this, 'musicPlayerRef.current.state.duration')) * WAVEFORM_IMAGE_WIDTH
        );
    };

    render() {
        return (
            <div className="main-screen">
                <Nav />

                <SongsFeed
                    musicPlayerRef={this.musicPlayerRef}
                    currentAudioList={this.state.audioList}
                    waveformProgressBarWidth={this.state.waveformProgressBarWidth}
                    songPlaying={this.state.songPlaying}
                    updateAudioList={(newAudioList, shouldRerenderPlayer) => {
                        const newState = shouldRerenderPlayer?
                            {
                                audioList: newAudioList,
                                playerUiid: getUiid()
                            }:
                            {
                                audioList: newAudioList,
                            };

                        this.setState(newState);
                    }}
                />

                {/*{!this.isPlaylistEmpty() && (*/}
                <ReactJkMusicPlayer
                    {...JK_MUSIC_PLAYER_DEFAULT_SETTINGS}
                    audioLists={this.state.audioList}
                    autoPlay={!isArrayEmpty(this.state.audioList)}
                    ref={this.musicPlayerRef}
                    key={this.state.playerUiid}
                    onAudioPlay={() => {
                        setTimeout(() => {
                            this.setState({
                                waveformProgressBarWidth: this.calculateProgressBarWidth(),
                                songPlaying: true,
                            });
                        }, 500);
                    }}
                    onAudioPause={() => {
                        this.setState({
                            waveformProgressBarWidth: this.calculateProgressBarWidth(),
                            songPlaying: false,
                        });
                    }}
                    onAudioSeeked={() => {
                        this.setState({
                            waveformProgressBarWidth: this.calculateProgressBarWidth(),
                        });
                    }}
                />
                {/*)}*/}
            </div>
        );
    }
}

export default MainScreen;
