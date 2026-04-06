const { stripJsoncComments } = require('./Utils');

/**
 * Manages browser sources and provides methods to retrieve source information.
 */
class BrowserSources {
  /**
   * Initializes a new instance of the BrowserSources class.
   * @param {string} filePath - Path to the JSONC file containing browser sources data.
   * @throws {Error} If filePath is missing, file does not exist, or file content is invalid JSON.
   */
  constructor(filePath) {
    if (!filePath) {
      throw new Error('File path is required');
    }
    const fs = require('fs');
    if (!fs.existsSync(filePath)) {
      throw new Error('File does not exist');
    }
    const content = fs.readFileSync(filePath, 'utf8');
    const stripped = stripJsoncComments(content);
    try {
      this.data = JSON.parse(stripped);
    } catch (e) {
      throw new Error('Invalid JSONC');
    }
  }

  /**
   * Retrieves all available browser sources.
   * @returns {Array} An array of all browser sources.
   */
  GetAll() {
    return this.data.browsers;
  }

  /**
   * Retrieves all available URLs.
   * @returns {Array} An array of all URLs.
   */
  GetAllURLs() {
    return this.data.browsers.flatMap(browser => browser.newsUrls);
  }

  /**
   * Gets the URL for a specified browser source.
   * @param {string} forSource - The name of the browser source.
   * @returns {string|undefined} The URL for the specified source, or undefined if not found.
   */
  GetURL(forSource) {
    const browser = this.data.browsers.find(b => b.name === forSource);
    return browser ? browser.newsUrls[0] : undefined;
  }

  /**
   * Gets the source name for a specified URL.
   * @param {string} forURL - The URL of the browser source.
   * @returns {string|undefined} The name of the source for the specified URL, or undefined if not found.
   */
  GetSourceName(forURL) {
    const browser = this.data.browsers.find(b => b.newsUrls.includes(forURL));
    return browser ? browser.name : undefined;
  }
}

module.exports = BrowserSources;
