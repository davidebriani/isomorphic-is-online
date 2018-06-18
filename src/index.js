/* @flow */
import "babel-polyfill";
import { NetInfo } from "react-native";
import fetch from "cross-fetch";
import utils from "./utils";

type Options = {
  urls: Array<string>,
  timeout: number
};

const defaultOptions: Options = {
  urls: ["//1.1.1.1"],
  timeout: 3000
};

const isOnline = async (options?: Options = defaultOptions) => {
  if (utils.environment === "REACT-NATIVE") {
    const connectionInfo = await NetInfo.getConnectionInfo();
    switch (connectionInfo.type) {
      case "none":
        return false;
      case "wifi":
        return true;
      case "cellular":
        return true;
      case "unknown":
        return false;
      default:
        return false;
    }
  }

  let { urls, timeout } = options;
  if (!Array.isArray(urls) || !urls.every(utils.isString)) {
    urls = defaultOptions.urls;
  }
  if (!timeout || typeof timeout !== "number") {
    timeout = defaultOptions.timeout;
  }
  const onlinePromise = new Promise((resolve, reject) => {
    let failedUrls = 0;
    const registerFailedUrl = url => {
      failedUrls += 1;
      if (failedUrls >= urls.length) {
        resolve(false);
      }
    };
    urls.map(url => {
      fetch(url, {
        mode: "no-cors"
      })
        .then(() => resolve(true))
        .catch(() => registerFailedUrl(url));
    });
  });
  let cancelTimeout = () => {};
  const timeoutPromise = new Promise((resolve, reject) => {
    const tm = setTimeout(() => resolve(false), timeout);
    cancelTimeout = () => {
      clearTimeout(tm);
      resolve(true);
    };
    return tm;
  });
  const result = await Promise.race([onlinePromise, timeoutPromise]);
  cancelTimeout();
  return result;
};

export default isOnline;
