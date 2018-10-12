import 'assets/scss/SongDetails.scss';
import { Breadcrumb, Container, Header, Icon, Image } from 'semantic-ui-react';
import CommentSection from './CommentSection';
import PropTypes from 'prop-types';
import React from 'react';

class SongDetails extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {songToDisplay, goToSongsFeed} = this.props;

        return <div className="song-details-page">
            <Container className='song-details-container'>
                <Breadcrumb>
                    <span
                        className='song-details-go-back'
                        onClick={goToSongsFeed}
                    >
                        <Icon name='arrow left'/> Back
                    </span>
                    <Breadcrumb.Section
                        onClick={goToSongsFeed}
                        link
                    >
                        Home
                    </Breadcrumb.Section>
                    <Breadcrumb.Divider />
                    <Breadcrumb.Section active>Song Details</Breadcrumb.Section>
                </Breadcrumb>
                <Header as='h3' className='song-name-header txt-center'>{songToDisplay.singer}</Header>
                <Header as='h2' className='song-title-header txt-center'>{songToDisplay.name}</Header>
                <Image
                    className='song-cover'
                    src={songToDisplay.cover}
                />
                <hr className='divider'/>
                <CommentSection/>
            </Container>
        </div>;
    }
}

export default SongDetails;

SongDetails.propTypes = {
    songToDisplay: PropTypes.object,
    goToSongsFeed: PropTypes.func
};