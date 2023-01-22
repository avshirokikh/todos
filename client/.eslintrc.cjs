/* eslint-disable */
"use strict";
module.exports = {
    "extends": [
        "eslint:recommended",
        "plugin:import/errors",
        "plugin:react/recommended",
        "plugin:jsx-a11y/recommended"
    ],
    "plugins": ["react", "import", "jsx-a11y"],
    "rules": {
        "react/prop-types": 0,
        "indent": ["error", 2],
        "linebreak-style": 0,
        "quotes": ["error", "double"],
        "jsx-a11y/no-noninteractive-element-interactions": 0,
    },
    "parserOptions": {
        "ecmaVersion": 2022,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        }
    },
    "env": {
        "es6": true,
        "browser": true,
        "node": true
    },
};
