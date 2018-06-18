"use strict";

const ReactNative = jest.genMockFromModule("react-native");

let connectionInfo = { type: "wifi" };

export const NetInfo = {
  __setConnectionInfo: info => {
    connectionInfo = info;
  },
  getConnectionInfo: () => connectionInfo
};

export default ReactNative;
