import 'assets/scss/Nav.scss';

import { Icon, Input, Menu } from 'semantic-ui-react';
import { NAVIGATION_MENU_PROPS } from '../../config/components-defaults-config';
import PropTypes from 'prop-types';
import React from 'react';

const Nav = ({ goToSongsFeed, goToExploreNewAlbums, goToMyPlaylists }) => {
    return (
        <Menu
            {...NAVIGATION_MENU_PROPS}
        >
            <Menu.Item
                onClick={goToSongsFeed}
                header
            >
                <Icon name="cloud"/> MelodyCloud
            </Menu.Item>
            <Menu.Item
                className="explore-new-albums-item"
                onClick={goToExploreNewAlbums}
            >
                <Icon name="hotjar"/> Explore new albums
            </Menu.Item>
            <Menu.Item
                className="go-to-my-playlists-item"
                onClick={goToMyPlaylists}
            >
                <Icon name="list alternate outline"/> Go to my playlists
            </Menu.Item>
            <Menu.Item as="a">
                <Input icon="search" placeholder="Search for songs..."/>
            </Menu.Item>
        </Menu>
    );
};

export default Nav;

Nav.propTypes = {
    goToSongsFeed: PropTypes.func,
    goToExploreNewAlbums: PropTypes.func,
    goToMyPlaylists: PropTypes.func,
};
