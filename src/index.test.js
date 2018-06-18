import { NetInfo } from "react-native";
import fetch from "cross-fetch";
import isOnline from "./index";
import utils from "./utils";

jest.mock("react-native");
jest.mock("cross-fetch");
jest.mock("./utils");

const defaultOptions = {
  urls: ["//1.1.1.1"],
  timeout: 3000
};

describe("WEB", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    utils.__setEnvironment("WEB");
  });

  test("calls cross-fetch once by default", async done => {
    try {
      fetch.mockResolvedValue(true);
      const online = await isOnline();
      expect(fetch.mock.calls.length).toBe(1);
      expect(fetch.mock.calls[0][0]).toBe(defaultOptions.urls[0]);
      expect(online).toBe(true);
      done();
    } catch (e) {
      done.fail(e);
    }
  });

  test("calls cross-fetch three times for three urls", async done => {
    try {
      fetch.mockResolvedValue(true);
      await isOnline({
        urls: ["//1.1.1.1", "https://www.apple.com", "BAD URI"]
      });
      expect(fetch.mock.calls.length).toBe(3);
      done();
    } catch (e) {
      done.fail(e);
    }
  });

  test("uses default options when supplied malformed ones", async done => {
    try {
      fetch.mockResolvedValue(true);
      await isOnline({
        urls: ["//1.1.1.1", "https://www.apple.com", 1234567890],
        timeout: "3000"
      });
      expect(fetch.mock.calls.length).toBe(1);
      expect(fetch.mock.calls[0][0]).toBe(defaultOptions.urls[0]);
      await isOnline({
        urls: "//1.1.1.1",
        timeout: 3000
      });
      expect(fetch.mock.calls.length).toBe(2);
      expect(fetch.mock.calls[1][0]).toBe(defaultOptions.urls[0]);
      done();
    } catch (e) {
      done.fail(e);
    }
  });

  test("returns offline when every url is rejected", async done => {
    try {
      fetch.mockResolvedValue(Promise.reject());
      const online = await isOnline({
        urls: ["//1.1.1.1", "https://www.apple.com", "1234567890"],
        timeout: 3000
      });
      expect(fetch.mock.calls.length).toBe(3);
      expect(online).toBe(false);
      done();
    } catch (e) {
      done.fail(e);
    }
  });
});

const getConnectionInfoSpy = jest.spyOn(NetInfo, "getConnectionInfo");
describe("REACT-NATIVE", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    utils.__setEnvironment("REACT-NATIVE");
  });

  test("calls NetInfo once", async done => {
    try {
      NetInfo.__setConnectionInfo({ type: "wifi" });
      const online = await isOnline();
      expect(getConnectionInfoSpy.mock.calls.length).toBe(1);
      expect(online).toBe(true);
      done();
    } catch (e) {
      done.fail(e);
    }
  });

  test("returns correct connection status", async done => {
    try {
      let online = false;
      const getConnectionInfoSpy = jest.spyOn(NetInfo, "getConnectionInfo");
      NetInfo.__setConnectionInfo({ type: "none" });
      online = await isOnline();
      expect(getConnectionInfoSpy.mock.calls.length).toBe(1);
      expect(online).toBe(false);
      NetInfo.__setConnectionInfo({ type: "wifi" });
      online = await isOnline();
      expect(getConnectionInfoSpy.mock.calls.length).toBe(2);
      expect(online).toBe(true);
      NetInfo.__setConnectionInfo({ type: "cellular" });
      online = await isOnline();
      expect(getConnectionInfoSpy.mock.calls.length).toBe(3);
      expect(online).toBe(true);
      NetInfo.__setConnectionInfo({ type: "unknown" });
      online = await isOnline();
      expect(getConnectionInfoSpy.mock.calls.length).toBe(4);
      expect(online).toBe(false);
      NetInfo.__setConnectionInfo({ type: "rubbish" });
      online = await isOnline();
      expect(getConnectionInfoSpy.mock.calls.length).toBe(5);
      expect(online).toBe(false);
      done();
    } catch (e) {
      done.fail(e);
    }
  });
});
