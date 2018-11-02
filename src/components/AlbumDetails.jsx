import 'assets/scss/AlbumDetails.scss';
import PropTypes from 'prop-types';
import React from 'react';

import { Breadcrumb, Button, Container, Header, Icon } from 'semantic-ui-react';

class AlbumDetails extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {goToSongsFeed, albumToDisplay} = this.props;

        return (<Container className='album-details-container'>
            <Breadcrumb>
                <Button
                    onClick={goToSongsFeed}
                    color='blue'
                    className={'song-details-go-back-btn'}
                    basic
                >
                    <Icon name='arrow left'/> Back
                </Button>
                <Breadcrumb.Section
                    onClick={goToSongsFeed}
                    link
                >
                    Home
                </Breadcrumb.Section>
                <Breadcrumb.Divider />
                <Breadcrumb.Section active>Album Details</Breadcrumb.Section>
                <Breadcrumb.Divider />
                <Breadcrumb.Section active>{albumToDisplay.title}</Breadcrumb.Section>
            </Breadcrumb>

            <Header as='h2' className='album-title-header txt-center'>{albumToDisplay.title}</Header>
        </Container>);
    }
}

export default AlbumDetails;

AlbumDetails.propTypes = {
    albumToDisplay: PropTypes.object,
    songInsideThisAlbum: PropTypes.array,
    goToSongsFeed: PropTypes.func,
    switchViewToSongDetails: PropTypes.func,
};