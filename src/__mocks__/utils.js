"use strict";

const utils = jest.genMockFromModule("./utils");

let environment = "WEB";

function __setEnvironment(env) {
  environment = env;
}

utils.__setEnvironment = __setEnvironment;
utils.isString = (s: any) => typeof s === "string" || s instanceof String;

Object.defineProperty(utils, "environment", {
  get: function() {
    return environment;
  }
});

module.exports = utils;
