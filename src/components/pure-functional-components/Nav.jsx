import 'assets/scss/Nav.scss';

import { Icon, Input, Menu } from 'semantic-ui-react';
import { NAVIGATION_MENU_PROPS } from '../../config/components-defaults-config';
import { NavigationTabs } from '../../utils/enumerations';
import PropTypes from 'prop-types';
import React from 'react';

const Nav = ({ goToSongsFeed, goToExploreNewAlbums, goToMyPlaylists, goToUploadPage, goToEditorPage }) => {
    return (
        <Menu
            {...NAVIGATION_MENU_PROPS}
        >
            <Menu.Item
                onClick={goToSongsFeed}
                header
            >
                <Icon name="cloud"/> {NavigationTabs.MELODY_CLOUD}
            </Menu.Item>
            <Menu.Item
                className="explore-new-albums-item"
                onClick={goToExploreNewAlbums}
            >
                <Icon name="hotjar"/> {NavigationTabs.EXPLORE_NEW_ALBUMS}
            </Menu.Item>
            <Menu.Item
                className="go-to-my-playlists-item"
                onClick={goToMyPlaylists}
            >
                <Icon name="list alternate outline"/> {NavigationTabs.GO_TO_MY_PLAYLISTS}
            </Menu.Item>
            <Menu.Item
                className="go-to-upload-page"
                onClick={goToUploadPage}
            >
                <Icon name="upload"/> {NavigationTabs.GO_TO_UPLOAD_PAGE}
            </Menu.Item>
            <Menu.Item
                className="go-to-editor-page"
                onClick={goToEditorPage}
            >
                <Icon name="edit"/> {NavigationTabs.GO_TO_EDITOR_PAGE}
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
    goToUploadPage: PropTypes.func,
    goToEditorPage: PropTypes.func,
};
