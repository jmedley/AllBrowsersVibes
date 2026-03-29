const { expect } = require("chai");
const NewsSources = require("../NewsSources");

describe("NewsSources", () => {
  let newsSources;

  beforeEach(() => {
    newsSources = new NewsSources();
  });

  describe("constructor", () => {
    it("should create a new instance of NewsSources", () => {
      expect(newsSources).to.be.instanceOf(NewsSources);
    });
  });

  describe("GetAll()", () => {
    it("should be a function", () => {
      expect(newsSources.GetAll).to.be.a("function");
    });

    it("should return an array of news sources", () => {
      const result = newsSources.GetAll();
      // Update this assertion once the method is implemented
      expect(result).to.be.an("array");
    });
  });

  describe("GetURL(forSource)", () => {
    it("should be a function", () => {
      expect(newsSources.GetURL).to.be.a("function");
    });

    it("should return a URL for a given source", () => {
      // Update this test with actual source names once implemented
      const result = newsSources.GetURL("BBC");
      expect(result).to.be.a("string");
    });
  });

  describe("GetSourceName(forURL)", () => {
    it("should be a function", () => {
      expect(newsSources.GetSourceName).to.be.a("function");
    });

    it("should return a source name for a given URL", () => {
      // Update this test with actual URLs once implemented
      const result = newsSources.GetSourceName("https://www.bbc.com");
      expect(result).to.be.a("string");
    });
  });
});
