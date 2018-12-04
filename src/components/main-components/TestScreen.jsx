import React from "react";
import 'assets/scss/MainScreen.scss';
import ReactJkMusicPlayer from "react-jinke-music-player";
import "react-jinke-music-player/assets/index.css";

import _ from 'lodash';
import {DEFAULT_PLAYER_VOLUME} from "../../config/application-config";
import {isArrayEmpty} from "../../utils/common-utils";
import {jinkieMockSongs} from "../../utils/mocks";

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