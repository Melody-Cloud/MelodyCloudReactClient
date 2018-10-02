import {Container, Icon, Input, Menu} from "semantic-ui-react";

const Nav = () => {
    return <Menu
        className='top-sticked-menu'
        fixed={'top'}
        inverted
        stackable
        borderless
    >
        <Container text>
            <Menu.Item header>
                <Icon name='cloud' /> MelodyCloud
            </Menu.Item>
            <Menu.Item as='a'>
                <Input icon='search' placeholder='Search for songs...' />
            </Menu.Item>
        </Container>
    </Menu>;
};

export default Nav;