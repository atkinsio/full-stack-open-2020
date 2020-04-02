module.exports = {
  "extends": [
    "airbnb",
    "plugin:prettier/recommended",
    "prettier/react"
  ],
  "env": {
    "commonjs": true,
    "es6": true,
    "node": true
  },
  "rules": {
    "jsx-a11y/href-no-hash": ["off"],
    "semi": [
      "error", "never"
  ],
    "eqeqeq": "error",
    "no-console": 0,
    "react/jsx-filename-extension": ["warn", { "extensions": [".js", ".jsx"] }],
    "max-len": [
      "warn",
      {
        "code": 80,
        "tabWidth": 2,
        "comments": 80,
        "ignoreComments": false,
        "ignoreTrailingComments": true,
        "ignoreUrls": true,
        "ignoreStrings": true,
        "ignoreTemplateLiterals": true,
        "ignoreRegExpLiterals": true
      }
    ]
  }
}
