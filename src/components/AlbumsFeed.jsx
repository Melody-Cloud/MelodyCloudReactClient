import React from 'react';
import { Container, Image, List } from 'semantic-ui-react';
import PropTypes from 'prop-types';

class AlbumsFeed extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        }
    }

    render() {
        const {
            albumsInFeed
        } = this.props;

        return <Container className="albums-feed-container" fluid>
            <List id="albums-feed" celled>
                {_.map(albumsInFeed, albumObject => {
                    return (
                        <List.Item className="single-album-item">
                            <List.Content>
                                <Image avatar src={albumObject.albumMiniature} />
                                <List.Content>
                                    <List.Header>{albumObject.title}</List.Header>
                                    <span>An excellent companion</span>
                                </List.Content>
                            </List.Content>
                        </List.Item>
                    );
                })}
            </List>
        </Container>;
    }
}

export default AlbumsFeed;

AlbumsFeed.propTypes = {
    albumsInFeed: PropTypes.array,
};