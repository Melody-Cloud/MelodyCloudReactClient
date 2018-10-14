import { Breadcrumb, Button, Container, Header, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import React from 'react';

class ArtistDetails extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {goToSongsFeed, artistToDisplay} = this.props;

        return <Container className='song-details-container'>
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
                <Breadcrumb.Section active>Song Details</Breadcrumb.Section>
            </Breadcrumb>

            <Header as='h2' className='song-title-header txt-center'>{artistToDisplay.name}</Header>
        </Container>;
    }
}

export default ArtistDetails;

ArtistDetails.propTypes = {
    artistToDisplay: PropTypes.object,
    goToSongsFeed: PropTypes.func
};