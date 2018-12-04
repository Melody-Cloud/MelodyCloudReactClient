import isEqual from 'lodash/isEqual';
import size from 'lodash/size';

export function isStringEmpty(inputString) {
    return (typeof inputString === 'string' || inputString instanceof String) && isEqual(size(inputString), 0);
}

export function isArrayEmpty(inputArray) {
    return isEqual(size(inputArray), 0);
}

function makeid() {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    for (let i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}