import isEqual from 'lodash/isEqual';
import size from 'lodash/size';

export function isStringEmpty(inputString) {
    return (typeof inputString === 'string' || inputString instanceof String) && isEqual(size(inputString), 0);
}

export function isArrayEmpty(inputArray) {
    return isEqual(size(inputArray), 0);
}

export function getGuid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}