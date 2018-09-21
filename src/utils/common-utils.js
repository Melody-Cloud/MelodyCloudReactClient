import isEqual from 'lodash/isEqual';
import size from 'lodash/size';

export function isStringEmpty(inputString) {
    return (typeof inputString === 'string' || inputString instanceof String) && isEqual(size(inputString), 0);
}