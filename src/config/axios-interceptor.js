import axios from 'axios';

const cognitoPrefix = 'CognitoIdentityServiceProvider';
const tokenTrailer = 'idToken';

export default function createAxiosInterceptor() {
    axios.interceptors.request.use(request => {
        request.headers = {'Authorization': `Bearer ${getCognitoToken()}`};
        return request
    }, error => {
        window.location.href = '/';
        return Promise.reject(error);
    })
}

function getCognitoToken() {
    let key;

    for (let i = 0 ; localStorage.key(i); i++) {
        key = localStorage.key(i);
        if (key.startsWith(cognitoPrefix) && key.endsWith(tokenTrailer)) {
            return localStorage.getItem(key);
        }
    }
    return null;
}
