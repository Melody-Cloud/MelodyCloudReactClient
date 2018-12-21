jest.mock('../../src/utils/cognito-utils', () => {
    return {
        getCurrentCognitoUser: function() {
            return "ab";
        },
    };
});