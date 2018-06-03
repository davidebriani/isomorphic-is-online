/* @flow */
import "babel-polyfill";
import fetch from "cross-fetch";

const isString = s => typeof s === "string" || s instanceof String;

type options = {
  urls: Array<string>,
  timeout: number
};

const defaultOptions: options = {
  urls: ["//1.1.1.1"],
  timeout: 3000
};

const isOnline = async (options: options) => {
  let { urls, timeout } = options;
  if (!Array.isArray(urls) || !urls.every(isString)) {
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
