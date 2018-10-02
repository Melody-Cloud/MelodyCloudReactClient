import React from "react";
import 'assets/scss/UploadPage.scss';
import Nav from "./pure-functional-components/Nav";
import {Container, Header, Segment} from "semantic-ui-react";

class UploadPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="upload-page">
                <Nav/>
                <Container className='upload-container' fluid>
                    <Segment>
                        <Header as='h1'>Upload a new song</Header>
                    </Segment>
                </Container>
            </div>
        );
    }
}

export default UploadPage