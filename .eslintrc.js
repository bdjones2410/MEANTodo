module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "sourceType": "module"
    },
    "rules": {
        "indent": [
            0,
            "tab"
        ],
        "linebreak-style": [
            1,
            "unix"
        ],
        "quotes": [
            0,
            "single"
        ],
        "semi": [
            2,
            "always"
        ],
        "no-console": [
          0,
          { allow: ["warn", "error"] }
        ],
        "no-undef": [
          0
        ],
        "no-unused-vars": [
          0
        ]
    }
};
