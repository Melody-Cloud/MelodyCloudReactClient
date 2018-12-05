import {
    Button,
    Dimmer,
    Divider,
    Form,
    Grid,
    Header,
    Icon,
    Image,
    Input,
    Loader,
    Message,
    Modal,
    Segment, Step, Transition,
} from 'semantic-ui-react';
import {cognitoConfig} from '../../config/cognito-config';
import React from 'react'

import 'assets/scss/RegisterLayout.scss';
import {Redirect} from 'react-router-dom';
import {isStringEmpty} from '../../utils/common-utils';
import concat from 'lodash/concat';
import drop from 'lodash/drop';
import get from 'lodash/get';
import isEqual from 'lodash/isEqual';
import map from 'lodash/map';
import split from 'lodash/split';

class RegisterLayout extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            formEmail: '',
            formPassword: '',
            formPasswordConfirmation: '',
            errorModalOpen: false,
            registrationCompleteModalOpen: false,
            // registrationCompleteModalOpen: true,
            registrationErrorObject: '',
            verificationCode: '',
            redirectInProgress: false,
            // redirectInProgress: true,
            redirectToApplication: false,
            verificationErrorOccurred: false,
            verificationErrorObject: null,
            // verificationErrorObject: 'Error: 2 validation errors detected: Value at \'username\' failed to satisfy constraint: Member must have length greater than or equal to 1; Value at \'username\' failed to satisfy constraint: Member must satisfy regular expression pattern: [\\p{L}\\p{M}\\p{S}\\p{N}\\p{P}]+',
        };

        const poolData = {
            UserPoolId: cognitoConfig.cognito.userPoolId,
            ClientId: cognitoConfig.cognito.userPoolClientId
        };

        this.userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
        this.authToken = new Promise((resolve, reject) => {
            const cognitoUser = this.userPool.getCurrentUser();

            if (cognitoUser) {
                cognitoUser.getSession((err, session) => {
                    if (err) {
                        reject(err);
                    } else if (!session.isValid()) {
                        resolve(null);
                    } else {
                        resolve(session.getIdToken().getJwtToken());
                    }
                });
            } else {
                resolve(null);
            }
        });
    }

    signOut() {
        this.userPool.getCurrentUser().signOut();
    }

    register(email, password, onSuccess, onFailure) {
        const dataEmail = {
            Name: 'email',
            Value: email
        };

        const attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);

        this.userPool.signUp(email, password, [attributeEmail], null,
            (err, result) => {
                if (!err) {
                    onSuccess(result);
                } else {
                    onFailure(err);
                }
            }
        );
    }

    verifyUser(email, code, onSuccess, onFailure) {
        this.provideCognitoUser(email).confirmRegistration(code, true, function confirmCallback(err, result) {
            if (!err) {
                onSuccess(result);
            } else {
                onFailure(err);
            }
        });
    }

    provideCognitoUser(email) {
        return new AmazonCognitoIdentity.CognitoUser({
            Username: email,
            Pool: this.userPool
        });
    }

    render() {
        if (this.state.redirectToApplication) {
            return <Redirect to="/"/>;
        }

        return <div className='login-form'>
            <Modal
                open={this.state.errorModalOpen}
            >
                <Modal.Header>Something went wrong <Icon name='frown'/></Modal.Header>
                <Modal.Content>
                    {this._renderErrorMessageFromAmazonService(this.state.registrationErrorObject)}
                </Modal.Content>
                <Modal.Actions>
                    <Button color='green' onClick={() => this.setState({errorModalOpen: false})} inverted>
                        <Icon name='checkmark'/> Go back
                    </Button>
                </Modal.Actions>
            </Modal>

            <Modal
                open={this.state.registrationCompleteModalOpen}
                className={this.state.redirectInProgress? 'redirect-in-progress-modal-content': ''}
            >
                {
                    !this.state.redirectInProgress &&
                    <Modal.Header>Your account has been created <Icon name='smile'/></Modal.Header>
                }
                {
                    this.state.redirectInProgress ?
                        <Modal.Content>
                            <Dimmer active>
                                <Loader>Your account has been activated<br/> Redirecting...</Loader>
                            </Dimmer>
                        </Modal.Content> :
                        <Modal.Content>
                            <Message negative={this.state.verificationErrorOccurred}>
                                <Message.Header>
                                    {this.state.verificationErrorOccurred ?
                                        'Some error occurred when you tried verifying your account. You can try again.' :
                                        `Now please verify your account by providing code,
                                    which you received on your e-mail account`}
                                </Message.Header>
                                <Divider/>
                                <Header size='medium'>Validation code:</Header>
                                <Input
                                    className='verification-code-input'
                                    value={this.state.verificationCode}
                                    onChange={
                                        (e) => this.setState({
                                            verificationCode: e.target.value,
                                        })
                                    }
                                    focus
                                />
                                <Divider/>
                                <Button className='confirm-validation-code-button' color='green' onClick={
                                    () => {
                                        this.verifyUser(
                                            this.state.formEmail,
                                            this.state.verificationCode,
                                            (result) => {
                                                console.dir(result);
                                                this.setState({
                                                    redirectInProgress: true,
                                                });

                                                setTimeout(() => {
                                                    this.setState({redirectToApplication: true});
                                                }, 4000); // SET TIMEOUT FOR AESTHETICS :D
                                            },
                                            (err) => {
                                                console.dir(err);

                                                setTimeout(() => {
                                                    this.setState({
                                                        verificationErrorOccurred: true,
                                                        verificationErrorObject: err,
                                                    });
                                                });
                                            }
                                        )
                                    }
                                } inverted>
                                    <Icon name='checkmark'/> Confirm
                                </Button>
                            </Message>
                            <Transition duration={500} visible={this.state.verificationErrorOccurred}>
                                <div className='verification-error-list'>
                                    {this._renderErrorMessageFromAmazonService(this.state.verificationErrorObject)}
                                </div>
                            </Transition>
                        </Modal.Content>
                }
            </Modal>

            <Grid textAlign='center' style={{height: '100%'}} verticalAlign='middle'>
                <Grid.Column style={{maxWidth: 450}}>
                    <Header as='h2' color='teal' textAlign='center'>
                        <Image src='https://react.semantic-ui.com/logo.png'/> Register your account
                    </Header>
                    <Form size='large'>
                        <Segment stacked>
                            <Form.Input
                                fluid icon='user'
                                iconPosition='left'
                                placeholder='E-mail address'
                                value={this.state.formEmail}
                                onChange={
                                    (e) => this.setState({
                                        formEmail: e.target.value,
                                    })
                                }
                            />
                            <Form.Input
                                fluid
                                icon='lock'
                                iconPosition='left'
                                placeholder='Password'
                                type='password'
                                value={this.state.formPassword}
                                onChange={
                                    (e) => this.setState({
                                        formPassword: e.target.value,
                                    })
                                }
                            />

                            <Form.Input
                                fluid
                                icon='check'
                                iconPosition='left'
                                placeholder='Confirm your password'
                                type='password'
                                value={this.state.formPasswordConfirmation}
                                onChange={
                                    (e) => this.setState({
                                        formPasswordConfirmation: e.target.value,
                                    })
                                }
                            />

                            <Button
                                color='teal'
                                fluid
                                size='large'
                                onClick={
                                    () => {
                                        this.register(
                                            this.state.formEmail,
                                            this.state.formPassword,
                                            (e) => {
                                                console.dir(e);
                                                this.setState({
                                                    registrationCompleteModalOpen: true
                                                });
                                            },
                                            (e) => {
                                                this.setState({
                                                    registrationErrorObject: e,
                                                    errorModalOpen: true
                                                });
                                            }
                                        );
                                    }
                                }
                            >
                                Register
                            </Button>
                        </Segment>
                        {
                            !isStringEmpty(this.state.formPassword) &&
                            this._renderMessageIfPasswordAreMatching(
                                isEqual(this.state.formPassword, this.state.formPasswordConfirmation)
                            )
                        }
                    </Form>
                </Grid.Column>
            </Grid>
        </div>;
    }

    _renderMessageIfPasswordAreMatching(areMatching) {
        return areMatching ?
            <Message positive>
                <Message.Header>Password are matching</Message.Header>
                <p>You can now go ahead and register.</p>
            </Message> :
            <Message negative>
                <Message.Header>Password are not matching</Message.Header>
                <p>Please check if you typed in your password correctly in both inputs</p>
            </Message>;
    }

    _renderErrorMessageFromAmazonService(errorObject) {
        const entries = this.createEntriesFromAmazonRegisterServiceResponse(errorObject);

        return <Step.Group vertical>
            {
                map(entries, (entry) => {
                    return !isStringEmpty(entry) ? <Step active>
                        <Step.Content>
                            <Step.Title>{entry}</Step.Title>
                        </Step.Content>
                    </Step> : '';
                })
            }
        </Step.Group>
    }

    createEntriesFromAmazonRegisterServiceResponse(errorObject) {
        const message = get(errorObject, 'message');
        const messageSplitted = split(message, ':');

        const firstEntry = get(messageSplitted, 0);

        const errorEntries = drop(messageSplitted, 1);
        return concat(firstEntry, split(errorEntries, ';'));
    }
}

export default RegisterLayout