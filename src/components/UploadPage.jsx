import 'assets/scss/UploadPage.scss';

import TagsInput from 'react-tagsinput'

import 'react-tagsinput/react-tagsinput.css'
import {
    Button,
    Container, Form,
    Header,
    Icon,
    List,
    Message,
    Modal,
    Segment,
} from 'semantic-ui-react';
import Nav from './pure-functional-components/Nav';
import React from 'react';

import { AMPLIFY_CONFIG } from '../config/application-config';
import { Link } from 'react-router-dom';
import { SONG_DESCRIPTION_PROPS, UPLOAD_BUTTON_PROPS } from '../config/components-defaults-config';
import Amplify, { Storage } from 'aws-amplify';
import Dropzone from 'react-dropzone';
import GenericBreadcrumbs from './pure-functional-components/GenericBreadcrumbs';
import PropTypes from 'prop-types';
import _ from 'lodash';

Amplify.configure(AMPLIFY_CONFIG);

class UploadPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            files: [],
            isFileUploading: false,
            errorModalOpen: false,
            errorMessageObject: null,
            displayUploadSuccessMessage: false,

            songDescription: '',
            songName: '',
            songTags: [],
        };

        this.dropzoneRef = null;
    }

    onSubmitUpload = () => {
        !this.state.isFileUploading &&
        Storage.put(this.state.files[0].name, this.state.files[0])
            .then(result => {
                this.setState({
                    isFileUploading: false,
                    displayUploadSuccessMessage: true,
                    files: [],
                });
            })
            .catch(err => {
                this.setState({
                    errorMessageObject: err,
                    errorModalOpen: true,
                    isFileUploading: false,
                });
            });

        this.setState({
            isFileUploading: true,
        });
    };

    handleFormChange = (e, { name, value }) => this.setState({ [name]: value });

    render() {
        const {
            goToSongsFeed
        } = this.props;

        const errorMessage = this._renderErrorMessage(
            this.state.errorMessageObject,
        );

        return (
            <Container className="upload-page">
                <GenericBreadcrumbs
                    goToSongsFeed={goToSongsFeed}
                    activeItemLabel={'Upload'}
                />

                <Modal open={this.state.errorModalOpen}>
                    <Modal.Header>
                        Could not upload the file <Icon name="frown"/>
                    </Modal.Header>
                    <Modal.Content>
                        <p>{errorMessage}</p>
                        {_.isEqual(errorMessage, '"No credentials"') && (
                            <p>
                                <Link to="/login">Click here to login again</Link>
                            </p>
                        )}
                    </Modal.Content>
                    <Modal.Actions>
                        <Button
                            color="green"
                            inverted
                            onClick={() => this.setState({ errorModalOpen: false })}
                        >
                            <Icon name="checkmark"/> Go back
                        </Button>
                    </Modal.Actions>
                </Modal>

                <Container className="upload-container" fluid>
                    <Segment className="upload-segment">
                        <Header as="h1" className="new-song-header">
                            Upload a new song
                        </Header>
                        <div className="file-dropzone-wrapper">
                            <Button
                                color="blue"
                                onClick={() => {
                                    this.dropzoneRef.open();
                                }}
                                className="upload-button"
                            >
                                <Icon name="upload"/> Open dialog
                            </Button>
                            <Dropzone
                                ref={node => {
                                    this.dropzoneRef = node;
                                }}
                                onDrop={(accepted) => {
                                    this.setState({ files: accepted });
                                }}
                                className="file-dropzone"
                            >
                                <p>Drop files here.</p>
                            </Dropzone>
                        </div>

                        <div className="list-of-files-to-upload">
                            <List>
                                {_.map(_.get(this, 'state.files'), f => (
                                    <List.Item key={f.name}>
                                        <List.Icon name="file alternate" verticalAlign="middle"/>
                                        <List.Content>
                                            {f.name} - {f.size} bytes
                                        </List.Content>
                                    </List.Item>
                                ))}
                            </List>
                        </div>

                        <Form>
                            <Form.Field>
                                <label>Song Name</label>
                                <input
                                    placeholder='Song Name'
                                    name='songName'
                                    value={this.state.songName}
                                    onChange={this.handleFormChange}
                                />
                            </Form.Field>
                            <Form.Field>
                                <Form.TextArea
                                    {...SONG_DESCRIPTION_PROPS}
                                    name='songDescription'
                                    value={this.state.songDescription}
                                    onChange={this.handleFormChange}
                                />
                            </Form.Field>
                            <Form.Field>
                            </Form.Field>
                        </Form>

                        <div className="tags-input-wrapper">
                            <label>Tags</label>
                            <TagsInput
                                value={this.state.songTags}
                                onChange={(songTags) => {
                                    this.setState({songTags});
                                }}
                            />
                        </div>

                        <div className="submit-button-wrapper">
                            <Button
                                {...UPLOAD_BUTTON_PROPS}
                                onClick={this.onSubmitUpload}
                                loading={this.state.isFileUploading}
                            >
                                <Icon name="paper plane"/> Submit upload
                            </Button>
                        </div>
                        {this.state.displayUploadSuccessMessage && (
                            <Message positive>
                                <Message.Header>Upload success!</Message.Header>
                                <p>Your files were successfully uploaded</p>
                            </Message>
                        )}
                    </Segment>
                </Container>
            </Container>
        );
    }

    _renderErrorMessage(errorMessageObject) {
        return JSON.stringify(errorMessageObject);
    }
}

export default UploadPage;

UploadPage.propTypes = {
    goToSongsFeed: PropTypes.func,
};
