import 'assets/scss/GenericBreadcrumbs.scss';
import React from 'react';

import { Breadcrumb, Button, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const GenericBreadcrumbs = ({activeItemLabel, goToSongsFeed}) => {
    return (<Breadcrumb>
        <Button
            onClick={goToSongsFeed}
            className={'go-back-btn'}
            color='blue'
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
        <Breadcrumb.Divider/>
        <Breadcrumb.Section active>{activeItemLabel}</Breadcrumb.Section>
    </Breadcrumb>);
};

export default GenericBreadcrumbs;

GenericBreadcrumbs.propTypes = {
    activeItemLabel: PropTypes.string,

    goToSongsFeed: PropTypes.func,
};