import 'assets/scss/MainScreen.scss';
import 'react-jinke-music-player/assets/index.css';
import React from 'react';
import ReactJkMusicPlayer from 'react-jinke-music-player';

import {jinkieMockSongs} from '../../utils/mocks';

class TestScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="main-screen">
                <ReactJkMusicPlayer
                    audioLists={jinkieMockSongs}
                    mode={'full'}
                />
            </div>
        );
    }
}

export default TestScreen