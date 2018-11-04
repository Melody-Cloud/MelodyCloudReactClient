import 'assets/scss/PlaylistView.scss';

import { Container, Header } from 'semantic-ui-react';
import GenericBreadcrumbs from './pure-functional-components/GenericBreadcrumbs';
import PropTypes from 'prop-types';
import React from 'react';
import _ from 'lodash';

class PlaylistView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        const {
            goToSongsFeed
        } = this.props;

        return <Container className="playlist-view-container">
            <GenericBreadcrumbs
                activeItemLabel='My playlists'
                goToSongsFeed={goToSongsFeed}
            />

            <Header as='h2' className='my-playlists-header txt-center'>My playlists</Header>

            {/*<List*/}
                {/*id="albums-feed"*/}
                {/*size={'huge'}*/}
                {/*celled*/}
            {/*>*/}
                {/*{_.map(listOfAlbumsToPresent, albumObject => {*/}
                    {/*return (*/}
                        {/*<List.Item*/}
                            {/*className="single-album-item-in-explore-new-albums"*/}
                            {/*onClick={() => {*/}
                                {/*switchViewToAlbumDetails(albumObject)*/}
                            {/*}}*/}
                        {/*>*/}
                            {/*<Image avatar src={albumObject.albumMiniature}/>*/}
                            {/*<List.Content>*/}
                                {/*<List.Header>{albumObject.albumName}</List.Header>*/}
                                {/*<span>An excellent companion</span>*/}
                            {/*</List.Content>*/}
                        {/*</List.Item>*/}
                    {/*);*/}
                {/*})}*/}
            {/*</List>*/}
        </Container>;
    }
}

export default PlaylistView;

PlaylistView.propTypes = {
    goToSongsFeed: PropTypes.func,
};