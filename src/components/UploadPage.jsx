import React from "react";
import 'assets/scss/UploadPage.scss';
import Nav from "./pure-functional-components/Nav";
import {Button, Container, Header, Icon, List, Message, Modal, Segment} from "semantic-ui-react";
import UploadButton from "./pure-functional-components/UploadButton";
import _ from 'lodash';

import Amplify, {Storage} from "aws-amplify";
import Dropzone from 'react-dropzone'
import {Link} from "react-router-dom";

Amplify.configure({
    Auth: {
        identityPoolId: 'eu-west-1:e1dd71be-5ad8-4b70-aee5-57692cfa2ab1', //REQUIRED - Amazon Cognito Identity Pool ID
        region: 'eu-west-1', // REQUIRED - Amazon Cognito Region
        userPoolId: 'eu-west-1_KKJMEabDC', //OPTIONAL - Amazon Cognito User Pool ID
        userPoolWebClientId: '4ji0pe7am9dnq9se5stgtslk5m', //OPTIONAL - Amazon Cognito Web Client ID
    },
    Storage: {
        bucket: 'melody-cloud-songs', //REQUIRED -  Amazon S3 bucket
        region: 'eu-west-1', //OPTIONAL -  Amazon service region
    }
});

class UploadPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            files: [],
            isFileUploading: false,
            errorModalOpen: false,
            errorMessageObject: null,
            displayUploadSuccessMessage: false
        };

        this.dropzoneRef = null;
    }

    render() {
        const errorMessage = this._renderErrorMessage(this.state.errorMessageObject);

        return (
            <div className="upload-page">
                <Modal
                    open={this.state.errorModalOpen}
                >
                    <Modal.Header>Couldn't upload the file <Icon name='frown'/></Modal.Header>
                    <Modal.Content>
                        <p>{errorMessage}</p>
                        {
                            (_.isEqual(errorMessage, '"No credentials"')) &&
                            <p><Link to="/login" >Click here to login again</Link></p>
                        }
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='green' onClick={() => this.setState({errorModalOpen: false})} inverted>
                            <Icon name='checkmark'/> Go back
                        </Button>
                    </Modal.Actions>
                </Modal>

                <Nav/>
                <Container className='upload-container' fluid>
                    <Segment className='upload-segment'>
                        <Header as='h1' className='new-song-header'>Upload a new song</Header>
                        <div className='file-dropzone-wrapper'>
                            <Button color='blue' onClick={() => { this.dropzoneRef.open() }} className='upload-button'>
                                <Icon name='upload' /> Open dialog
                            </Button>
                            <Dropzone
                                ref={(node) => { this.dropzoneRef = node; }}
                                onDrop={
                                    (accepted, rejected) => {
                                        this.setState({files: accepted})
                                    }
                                }
                                className='file-dropzone'
                            >
                                <p>Drop files here.</p>
                            </Dropzone>
                        </div>
                        <div className='list-of-files-to-upload'>
                            <List>
                                {
                                    _.map(_.get(this, 'state.files'), f =>
                                        <List.Item key={f.name}>
                                            <List.Icon name='file alternate' verticalAlign='middle' />
                                            <List.Content>
                                                {f.name} - {f.size} bytes
                                            </List.Content>
                                        </List.Item>
                                    )
                                }
                            </List>
                        </div>
                        <div className="submit-button-wrapper">
                            <Button
                                color='green'
                                onClick={() => {
                                    !this.state.isFileUploading && Storage.put(this.state.files[0].name, this.state.files[0])
                                        .then(result => {
                                                console.dir(result);
                                                this.setState({
                                                    isFileUploading: false,
                                                    displayUploadSuccessMessage: true,
                                                    files: []

                                                });
                                            }
                                        )
                                        .catch(
                                            err => {
                                                console.log('console.dir(err);');
                                                console.dir(err);
                                                this.setState({
                                                    errorMessageObject: err,
                                                    errorModalOpen: true,
                                                    isFileUploading: false
                                                });
                                            }
                                        );

                                    this.setState({
                                        isFileUploading: true
                                    });
                                }}
                                className='submit-upload-button'
                                loading={this.state.isFileUploading}
                            >
                                <Icon name='paper plane' /> Submit upload
                            </Button>
                        </div>
                        {   this.state.displayUploadSuccessMessage &&
                            <Message positive>
                                <Message.Header>Upload success!</Message.Header>
                                <p>Your files were successfully uploaded</p>
                            </Message>
                        }
                    </Segment>
                </Container>
            </div>
        );
    }

    _renderErrorMessage(errorMessageObject) {
        return JSON.stringify(errorMessageObject);
    }
}

export default UploadPage