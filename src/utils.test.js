import utils from "./utils";

describe("environment", () => {
  beforeEach(() => {
    delete global.document;
    delete global.navigator;
  });

  test("should get a WEB environment", () => {
    global.document = {};
    const environment = utils.environment;
    expect(environment).toBe("WEB");
  });

  test("should get a REACT-NATIVE environment", () => {
    global.navigator = {
      product: "ReactNative"
    };
    const environment = utils.environment;
    expect(environment).toBe("REACT-NATIVE");
  });

  test("should get a NODE environment", () => {
    const environment = utils.environment;
    expect(environment).toBe("NODE");
  });
});

describe("isString()", () => {
  test("input string should be a string", () => {
    const stringLiteral = "String literal";
    const stringObject = new String("String object");
    expect(utils.isString(stringLiteral)).toBe(true);
    expect(utils.isString(stringObject)).toBe(true);
  });

  test("input objects should NOT be a string", () => {
    const object = { property: "value" };
    const array = [1, 2, 3];
    const number = 0;
    const nullValue = null;
    expect(utils.isString(object)).toBe(false);
    expect(utils.isString(array)).toBe(false);
    expect(utils.isString(number)).toBe(false);
    expect(utils.isString(nullValue)).toBe(false);
  });

  test("returns false with no input", () => {
    expect(utils.isString()).toBe(false);
  });
});
