import React from 'react'
import {Button, Form, Grid, Header, Image, Message, Modal, Segment, Icon} from 'semantic-ui-react'
import {cognitoConfig} from "../config/cognito-config";

import 'assets/scss/RegisterLayout.scss';
import {isStringEmpty} from "../utils/common-utils";
import isEqual from 'lodash/isEqual';
import get from 'lodash/get';

class RegisterLayout extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            formEmail: '',
            formPassword: '',
            formPasswordConfirmation: '',
            errorModalOpen: false,
            registrationErrorObject: ''
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

    render() {
        return <div className='login-form'>
            <Modal
                open={this.state.errorModalOpen}
            >
                <Modal.Header>Something went wrong <Icon name='frown'/></Modal.Header>
                <Modal.Content>
                    {this._renderErrorMessage(this.state.registrationErrorObject)}
                </Modal.Content>
                <Modal.Actions>
                    <Button color='green' onClick={() => this.setState({ errorModalOpen: false })} inverted>
                        <Icon name='checkmark' /> Go back
                    </Button>
                </Modal.Actions>
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
                                                alert('success!');
                                                alert(e)
                                            },
                                            (e) => {
                                                // alert('failure');
                                                // alert(e);
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
            </Message>:
            <Message negative>
                <Message.Header>Password are not matching</Message.Header>
                <p>Please check if you typed in your password correctly</p>
            </Message>;
    }

    _renderErrorMessage(errorObject) {
        console.dir(errorObject);

        return get(errorObject, "message");
    }
}

export default RegisterLayout