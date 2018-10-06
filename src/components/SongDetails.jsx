import React from "react";
import Nav from "./pure-functional-components/Nav";
import {Header, Segment, Container} from "semantic-ui-react";
import {jinkieMockSongs} from "../utils/mocks";
import 'assets/scss/SongDetails.scss';

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
            <Container className='song-details-container' fluid>
                <Header as='h3' className='song-name-header txt-center'>{_.get(this.state.displayedSong, 'singer')}</Header>
                <Header as='h2' className='song-title-header txt-center'>{_.get(this.state.displayedSong, 'name')}</Header>
            </Container>
        </div>;
    }
}

export default SongDetails;