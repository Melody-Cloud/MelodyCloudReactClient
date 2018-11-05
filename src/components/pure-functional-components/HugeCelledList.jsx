import { List } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import React from 'react';


const HugeCelledList = ({children}) => {
    return (<List
        size={'massive'}
        celled
        ordered
    >
        {children}
    </List>);
};

export default HugeCelledList;

HugeCelledList.propTypes = {
    children: PropTypes.object,
};