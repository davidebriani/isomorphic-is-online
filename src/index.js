/* @flow */
import "babel-polyfill";
import fetch from "cross-fetch";

const isString = s => typeof s === "string" || s instanceof String;

const isOnline = async (customUrls: Array<string>, timeout: number = 3000) => {
  let urls = ["//1.1.1.1"];
  if (Array.isArray(customUrls) && customUrls.every(isString)) {
    urls = customUrls;
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
