// MOCK
export function mockWatchMedia() {
    window.matchMedia = window.matchMedia || function() {
        return {
            matches : false,
            // addListener : function() {},
            // removeListener: function() {}
        };
    };
}

export function setUserNotLogged() {
    global.AmazonCognitoIdentity = {
        CognitoUserPool: function() {
            return {
                getCurrentUser: () => {
                    return null;
                },
            };
        },
    };
}