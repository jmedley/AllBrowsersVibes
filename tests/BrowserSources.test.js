const assert = require("assert");
const BrowserSources = require("../BrowserSources");

describe("BrowserSources", function () {
  let bs;

  beforeEach(function () {
    bs = new BrowserSources("./data/browser-sources.jsonc");
  });

  describe("#getAll()", function () {
    it("should return an array of browser sources", function () {
      const sources = bs.getAll();
      assert(Array.isArray(sources));
      assert(sources.length > 0);
      sources.forEach((source) => {
        assert(source.hasOwnProperty("name"));
        assert(source.hasOwnProperty("newsUrls"));
        assert(Array.isArray(source.newsUrls));
      });
    });
  });

  describe("#getAllURLs()", function () {
    it("should return an array of all URLs", function () {
      const urls = bs.getAllURLs();
      assert(Array.isArray(urls));
      assert(urls.length > 0);
      urls.forEach((url) => {
        assert.strictEqual(typeof url, "string");
      });
    });
  });

  describe("#getURL(forSource)", function () {
    it("should return URL for known source", function () {
      const url = bs.getURL("Arc");
      assert.strictEqual(typeof url, "string");
      assert(url.startsWith("https://"));
    });

    it("should return undefined for unknown source", function () {
      const url = bs.getURL("Unknown Browser");
      assert.strictEqual(url, undefined);
    });
  });

  describe("#getSourceName(forURL)", function () {
    it("should return source name for known URL", function () {
      const name = bs.getSourceName("https://browsercompany.substack.com/");
      assert.strictEqual(name, "Arc");
    });

    it("should return undefined for unknown URL", function () {
      const name = bs.getSourceName("https://unknown.com");
      assert.strictEqual(name, undefined);
    });
  });
});
