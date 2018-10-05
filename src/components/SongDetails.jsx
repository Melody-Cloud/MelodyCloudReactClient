import React from "react";
import Nav from "./pure-functional-components/Nav";
import {Header, Segment} from "semantic-ui-react";
import {jinkieMockSongs} from "../utils/mocks";

class SongDetails extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            displayedSong: jinkieMockSongs[0]
        }
    }

    render() {
        return <div className="song-details-page">
            <Nav/>
            <Segment>
                <Header as='h2'>{_.get(this.state.displayedSong, 'name')}</Header>
            </Segment>
        </div>;
    }
}

export default SongDetails;