import { entityRequest } from "../http-request";

describe("http-request tests", () => {
  const endPoint = "http://localhost:3000/test";

  it("should return the result of a successful API call", async () => {
    const successMockResult = {
      ok: true,
      json: () => Promise.resolve(1)
    };

    const body = {
      test: "test body"
    };

    window.fetch = jest
      .fn()
      .mockImplementation(() => Promise.resolve(successMockResult));

    const result = await entityRequest(endPoint, "GET", body);
    expect(result).toBe(1);
  });

  it("should throw an error for a failed API call", async () => {
    const failedMockResult = {
      ok: false,
      response: { message: 1 },
      json: () =>
        Promise.resolve({
          message: 1
        })
    };
    window.fetch = jest
      .fn()
      .mockImplementation(() => Promise.resolve(failedMockResult));

    try {
      await entityRequest(endPoint);
      // it's gonna error on purpose so will not be handling in here.
    } catch (err) {
      expect(err.message).toBe(1);
    }
  });
});
