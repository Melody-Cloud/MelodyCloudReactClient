import 'assets/scss/RtmpPoc.scss';

import {
    Container,
} from 'semantic-ui-react';
import React from 'react';

import GenericBreadcrumbs from './pure-functional-components/GenericBreadcrumbs';
import MediaElement from './MediaElement';
import PropTypes from 'prop-types';

class RtmpPoc extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        const {
            goToSongsFeed
        } = this.props;

        const
            sources = [
                {src: 'rtmp://s1gp5dbeykj8ou.cloudfront.net/cfx/st/mp3:Oasis_Wonderwall', type: 'audio/rtmp'},
            ],
            config = {},
            tracks = {}
        ;

        return (
            <Container className="rtmp-poc-page">
                <GenericBreadcrumbs
                    goToSongsFeed={goToSongsFeed}
                    activeItemLabel={'Rtmp'}
                />

                <MediaElement
                    id="player1"
                    mediaType="audio"
                    preload="none"
                    controls
                    width="640"
                    height="360"
                    poster=""
                    sources={JSON.stringify(sources)}
                    options={JSON.stringify(config)}
                    tracks={JSON.stringify(tracks)}
                />

                <audio type="audio/rtmp" id="mediaplayer">
                    <source src="rtmp://s1gp5dbeykj8ou.cloudfront.net/cfx/st/mp3:Oasis_Wonderwall"   type="audio/rtmp" />
                </audio>
            </Container>
        );
    }
}

export default RtmpPoc;

RtmpPoc.propTypes = {
    goToSongsFeed: PropTypes.func,
};
