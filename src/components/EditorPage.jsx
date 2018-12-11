import 'assets/scss/EditorPage.scss';

import {
    Container,
} from 'semantic-ui-react';
import React from 'react';

import GenericBreadcrumbs from './pure-functional-components/GenericBreadcrumbs';
import PropTypes from 'prop-types';
import _ from 'lodash';

class EditorPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            goToSongsFeed
        } = this.props;

        return (
            <Container className="editor-page">
                <GenericBreadcrumbs
                    goToSongsFeed={goToSongsFeed}
                    activeItemLabel={'Editor'}
                />

                <iframe src="http://localhost:3000/" style={{
                    position: 'fixed',
                    top: '100px',
                    bottom: '0px',
                    right: '0px', width: '100%',
                    border: 'none',
                    margin: 0,
                    padding: 0,
                    overflow: 'hidden',
                    zIndex: 999999,
                    height: '100%',
                }}/>
            </Container>
        );
    }
}

export default EditorPage;

EditorPage.propTypes = {
    goToSongsFeed: PropTypes.func,
};
