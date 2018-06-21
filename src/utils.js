/* @flow */

export default {
  get environment(): "WEB" | "REACT-NATIVE" | "NODE" {
    if (typeof document !== "undefined") {
      return "WEB";
    } else if (
      typeof navigator !== "undefined" &&
      navigator.product === "ReactNative"
    ) {
      return "REACT-NATIVE";
    } else {
      return "NODE";
    }
  },
  isString: (s: any): boolean => typeof s === "string" || s instanceof String
};
