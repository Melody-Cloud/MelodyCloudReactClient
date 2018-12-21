import 'assets/scss/RtmpPoc.scss';

import {
    Container, Dimmer, Grid, Loader,
} from 'semantic-ui-react';
import React from 'react';

import { getModelObjectsFromApi } from '../../api-fetching/api-fetching';
import GenericBreadcrumbs from '../pure-functional-components/GenericBreadcrumbs';
import MediaElement from '../external/MediaElement';
import PropTypes from 'prop-types';
import SongCard from '../pure-functional-components/SongCard';

class RtmpPoc extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            areSongsLoadingFromApi: false,
            songsInFeed: [],
        };
    }

    componentDidMount() {
        getModelObjectsFromApi('songs-feed').then(retrievedSongs => {
            this.setState({
                areSongsLoadingFromApi: false,
                songsInFeed: retrievedSongs,
            });
        });
    }

    getRtmpSourceFromS3SourceUrl(s3SourceUrl) {
        let filename = s3SourceUrl.match(/([^/]+)(?=\.\w+$)/)[0];
        return `rtmp://s1gp5dbeykj8ou.cloudfront.net/cfx/st/mp3:${filename}`;
    }

    render() {
        const {
            goToSongsFeed,
        } = this.props;

        const {
            areSongsLoadingFromApi,
            songsInFeed,
        } = this.state;

        return (
            <Container className="rtmp-poc-page-container">
                <Dimmer active={areSongsLoadingFromApi}>
                    <Loader indeterminate size='huge'>
                        Loading new songs for you.
                    </Loader>
                </Dimmer>

                <GenericBreadcrumbs
                    goToSongsFeed={goToSongsFeed}
                    activeItemLabel={'Rtmp'}
                />

                <Container className="rtmp-songs-container" fluid>
                    {
                        _.map(songsInFeed, songObject => {
                            const
                                sources = [
                                    { src: this.getRtmpSourceFromS3SourceUrl(songObject.musicSrc), type: 'audio/rtmp' },
                                ],
                                config = {},
                                tracks = {}
                            ;

                            return <Grid className="middle aligned" style={{ alignItems: 'center' }}
                                         stackable>
                                <Grid.Column width={6}>
                                    <SongCard
                                        songObject={songObject}
                                    />
                                </Grid.Column>
                                <Grid.Column width={10}>
                                    <MediaElement
                                        id={`player${songObject.id}`}
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
                                </Grid.Column>
                            </Grid>;
                        })
                    }
                </Container>
            </Container>
        );
    }
}

export default RtmpPoc;

RtmpPoc.propTypes = {
    goToSongsFeed: PropTypes.func,
};
