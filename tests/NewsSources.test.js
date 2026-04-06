const assert = require('assert');
const NewsSources = require('../NewsSources');

describe('NewsSources', function() {
  let ns;

  beforeEach(function() {
    ns = new NewsSources('./data/news-sources.jsonc');
  });

  describe('#GetAll()', function() {
    it('should return an array of news sources', function() {
      const sources = ns.GetAll();
      assert(Array.isArray(sources));
      assert(sources.length > 0);
      sources.forEach(source => {
        assert(source.hasOwnProperty('SiteName'));
        assert(source.hasOwnProperty('newsUrls'));
        assert(Array.isArray(source.newsUrls));
      });
    });
  });

  describe('#GetAllURLs()', function() {
    it('should return an array of all URLs', function() {
      const urls = ns.GetAllURLs();
      assert(Array.isArray(urls));
      assert(urls.length > 0);
      urls.forEach(url => {
        assert.strictEqual(typeof url, 'string');
        assert(url.startsWith('https://'));
      });
    });
  });

  describe('#GetURL(forSource)', function() {
    it('should return URL for known source', function() {
      const url = ns.GetURL('Ars Technica');
      assert.strictEqual(typeof url, 'string');
      assert(url.startsWith('https://'));
    });

    it('should return undefined for unknown source', function() {
      const url = ns.GetURL('Unknown');
      assert.strictEqual(url, undefined);
    });
  });

  describe('#GetSourceName(forURL)', function() {
    it('should return source name for known URL', function() {
      const name = ns.GetSourceName('https://arstechnica.com/ai/');
      assert.strictEqual(name, 'Ars Technica');
    });

    it('should return undefined for unknown URL', function() {
      const name = ns.GetSourceName('https://unknown.com');
      assert.strictEqual(name, undefined);
    });
  });
});