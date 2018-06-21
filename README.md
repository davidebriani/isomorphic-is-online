# isomorphic-is-online

[![Build passing](https://img.shields.io/travis/TheWorm/isomorphic-is-online.svg?label=Travis+CI)](https://travis-ci.org/TheWorm/isomorphic-is-online)
[![Code coverage](https://img.shields.io/codecov/c/github/theworm/isomorphic-is-online.svg)](https://codecov.io/github/theworm/isomorphic-is-online)
[![NPM package](https://img.shields.io/npm/v/isomorphic-is-online.svg)](https://www.npmjs.com/package/isomorphic-is-online)
[![Code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Last commit](https://img.shields.io/github/last-commit/theworm/isomorphic-is-online.svg)](https://github.com/TheWorm/isomorphic-is-online)
[![License](https://img.shields.io/github/license/theworm/isomorphic-is-online.svg)](https://github.com/TheWorm/isomorphic-is-online/blob/master/LICENSE)

A simple utility you can use to know if you are online or not.

It relies on [cross-fetch](https://github.com/lquixada/cross-fetch), thus it aims to work on Node, React Native and Web (with browserify / webpack) environments.

## Installation

At the command-line terminal:

```bash
npm install --save isomorphic-is-online
```

Then in your code:

```javascript
// Using ES6 modules with Babel or TypeScript
import isOnline from "isomorphic-is-online";

// Using CommonJS modules
const isOnline = require("isomorphic-is-online").default;
```

## Usage

```javascript
import isOnline from "isomorphic-is-online";

console.log("Are you able to reach the internet?");
isOnline().then(isOnline => {
  console.log("Response:", isOnline);
});
```

`isOnline` returns a promise which resolves to `true` if a connection can be established and resolves to `false` if it cannot or the network requests time out.

## Default and custom options

An optional object can be passed to `isOnline` to customize some options:

| option  | type             | default       | description                                        |
| ------- | ---------------- | ------------- | -------------------------------------------------- |
| urls    | array of strings | ["//1.1.1.1"] | List of urls to request to check connection status |
| timeout | number           | 3000          | Milliseconds to wait before timing out the request |

```javascript
const options = {
  urls: ["https://www.apple.com", "//1.1.1.1"],
  timeout: 5000
};

isOnline(options).then(isOnline => {
  if (isOnline) {
    hackTheInternet();
  } else {
    beQuiet();
  }
});
```
