import 'assets/scss/Footer.scss';
import React from 'react';

import { Button, Container, Segment } from 'semantic-ui-react';

const Footer = () => {
    return (<Segment inverted vertical className="footer-segment">
        <Container className="ui clearing">
            <div className='brand-name-wrapper'>
                <a href="/">&copy; MelodyCloud 2018</a>
            </div>

            <div className="social-media-icons-wrapper right floated">
                <Button circular color='facebook' icon='facebook' />
                <Button circular color='twitter' icon='twitter' />
                <Button circular color='linkedin' icon='linkedin' />
                <Button circular color='instagram' icon='instagram' />
            </div>
        </Container>
    </Segment>);
};

export default Footer;