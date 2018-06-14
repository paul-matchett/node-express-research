module.exports = {
  "env": {
    "browser": true,
    "commonjs": true,
    "es6": true,
    "node": true
  },
  "parserOptions": {
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true
    }
  },
  "rules": {
    "no-unused-vars":
      [
        "error",
        {
          "vars": "all",
          "args": "after-used",
          "ignoreRestSiblings": false,
          "varsIgnorePattern": "^_"
        }
      ],
    "indent": [2, 2, { "SwitchCase": 1 }],
    "linebreak-style": [
      "error",
      "windows"
    ],
    "quotes": [
      "error",
      "single"
    ],
    "semi": [
      "error",
      "always"
    ],
    "keyword-spacing": 1,
    "block-spacing": 1,
    "no-console": 2,
    "space-before-blocks": [1, "always"],
    "comma-dangle": [1, "always-multiline"],
    "space-infix-ops": ["error", { "int32Hint": false }]
  }
};
