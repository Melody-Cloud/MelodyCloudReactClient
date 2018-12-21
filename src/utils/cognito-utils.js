/* global AmazonCognitoIdentity */

import { cognitoConfig } from '../config/cognito-config';

const poolData = {
    UserPoolId: cognitoConfig.cognito.userPoolId,
    ClientId: cognitoConfig.cognito.userPoolClientId,
};

const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
export const getCurrentCognitoUser = () => { return userPool.getCurrentUser()};