import {Button, Form, Grid, Header, Icon, Image, Modal, Segment} from 'semantic-ui-react';
import 'assets/scss/LoginLayout.scss';
import {Redirect} from 'react-router-dom';
import {cognitoConfig} from '../../config/cognito-config';
import React from 'react';
import _ from 'lodash';
import store from 'store';

class LoginLayout extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            formEmail: '',
            formPassword: '',
            redirectToApplication: false,
            errorModalOpen: false,
            loginErrorObject: null,
            redirectInProgress: false,
            isRedirecting: false
        };

        const poolData = {
            UserPoolId: cognitoConfig.cognito.userPoolId,
            ClientId: cognitoConfig.cognito.userPoolClientId
        };

        this.userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    }

    render() {
        if (this.state.redirectToApplication) {
            return <Redirect to={`/?jwtToken=${store.get('jwtToken')}`}/>;
        }

        return (
            <div className='login-form'>
                <Modal
                    open={this.state.errorModalOpen}
                >
                    <Modal.Header>Login went wrong <Icon name='frown'/></Modal.Header>
                    <Modal.Content>
                        {this._renderErrorMessageFromAmazonService(this.state.loginErrorObject)}
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='green' onClick={() => this.setState({errorModalOpen: false})} inverted>
                            <Icon name='checkmark'/> Go back
                        </Button>
                    </Modal.Actions>
                </Modal>

                <Grid textAlign='center' style={{height: '100%'}} verticalAlign='middle'>
                    <Grid.Column style={{maxWidth: 450}}>
                        <Header as='h2' color='teal' textAlign='center'>
                            <Image src='https://react.semantic-ui.com/logo.png'/> Log in to your account
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

                                <Button
                                    color='teal'
                                    fluid
                                    size='large'
                                    onClick={
                                        () => {
                                            this.handleSignin(
                                                this.state.formEmail,
                                                this.state.formPassword
                                            );
                                        }
                                    }
                                    loading={this.state.isRedirecting}
                                >
                                    Login
                                </Button>
                            </Segment>
                        </Form>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }

    createCognitoUser(email) {
        return new AmazonCognitoIdentity.CognitoUser({
            Username: email,
            Pool: this.userPool
        });
    }

    signin(email, password, onSuccess, onFailure) {
        let authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
            Username: email,
            Password: password
        });

        let cognitoUser = this.createCognitoUser(email);
        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: onSuccess,
            onFailure: onFailure
        });
    }

    handleSignin(email, password) {
        this.signin(email, password,
            () => {
                this.setState({
                    redirectToApplication: true
                });
            },
            (err) => {
                this.setState({
                    loginErrorObject: err,
                    errorModalOpen: true
                });
            }
        );

        const component = this;

        const redirectToMainPage = () => {
            let cognitoUser = component.userPool.getCurrentUser();

            if (cognitoUser) {
                cognitoUser.getSession((err, session) => {
                    if (!err && session.isValid()) {
                        const jwtToken = session.getIdToken().getJwtToken();

                        store.set('jwtToken', jwtToken);

                        component.setState({
                            isRedirecting: true
                        });
                    }
                });
            }
        };

        redirectToMainPage();
    }

    _renderErrorMessageFromAmazonService(errorObject) {
        return <Segment>
            {_.get(errorObject, 'message')}
        </Segment>;
    }
}

export default LoginLayout