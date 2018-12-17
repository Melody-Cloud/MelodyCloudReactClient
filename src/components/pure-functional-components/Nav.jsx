import 'assets/scss/Nav.scss';

import { Dropdown, Icon, Input, Menu } from 'semantic-ui-react';
import { NAVIGATION_MENU_PROPS } from '../../config/components-defaults-config';
import { NavigationTabs } from '../../utils/enumerations';
import { getCurrentCognitoUser } from '../../utils/cognito-utils';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';

const Nav = withRouter(({ goToSongsFeed, goToExploreNewAlbums, goToMyPlaylists, goToUploadPage, goToEditorPage,
                            history, onSearchChange, searchInputValue }) => {

    const currentCognitoUser = getCurrentCognitoUser();
    const cognitoUsernameToDisplay = _.get(currentCognitoUser, 'username', 'Not logged in');

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
                <Input
                    icon={{ name: 'search', circular: true, link: true }}
                    placeholder="Search for songs..."
                    onChange={onSearchChange}
                    value={searchInputValue}
                />
            </Menu.Item>

            <Menu.Menu position='right'>
                {
                    (currentCognitoUser !== null) ?
                        (<Menu.Item name='user-panel'>
                            <Icon name="user"/> {cognitoUsernameToDisplay}
                        </Menu.Item>):
                        (<Dropdown item text='sign in' icon='sign in alternate'><Dropdown.Menu>
                            <Dropdown.Item onClick={() => (history.push('/register'))}>Register</Dropdown.Item>
                            <Dropdown.Item onClick={() => (history.push('/login'))}>Login</Dropdown.Item>
                        </Dropdown.Menu></Dropdown>)
                }
            </Menu.Menu>
        </Menu>
    );
});

export default Nav;

Nav.propTypes = {
    goToSongsFeed: PropTypes.func,
    goToExploreNewAlbums: PropTypes.func,
    goToMyPlaylists: PropTypes.func,
    goToUploadPage: PropTypes.func,
    goToEditorPage: PropTypes.func,
    onSearchChange: PropTypes.func,
    searchInputValue: PropTypes.string,
};
