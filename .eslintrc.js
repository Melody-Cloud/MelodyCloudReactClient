module.exports = {
    'parser': 'babel-eslint',
    'extends': [
        'eslint:recommended',
        'plugin:react/recommended',
    ],
    "plugins": [
        "sort-imports-es6-autofix"
    ],
    "rules": {
        "quotes": [1, "single"],
        "sort-imports-es6-autofix/sort-imports-es6": [2, {
            "ignoreCase": false,
            "ignoreMemberSort": false,
            "memberSyntaxSortOrder": ["none", "all", "multiple", "single"]
        }]
    },
    "env": {
        "jest": true,
        "es6": true,
        "browser": true,
        "node": true
    }
};
