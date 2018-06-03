# isomorphic-is-online

[![Build passing](https://img.shields.io/travis/TheWorm/isomorphic-is-online.svg)](https://travis-ci.org/TheWorm/isomorphic-is-online)
[![Code coverage](https://img.shields.io/codecov/c/github/theworm/isomorphic-is-online.svg)](https://codecov.io/github/theworm/isomorphic-is-online)
[![Release version](https://img.shields.io/github/release/theworm/isomorphic-is-online.svg)](https://www.npmjs.com/package/isomorphic-is-online)

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
