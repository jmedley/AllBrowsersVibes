const { stripJsoncComments } = require('./Utils');

/**
 * Manages news sources and provides methods to retrieve source information.
 */
class NewsSources {
  /**
   * Initializes a new instance of the NewsSources class.
   * @param {string} filePath - Path to the JSONC file containing news sources data.
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
   * Retrieves all available news sources.
   * @returns {Array} An array of all news sources.
   */
  GetAll() {
    return this.data.sites;
  }

  /**
   * Retrieves all available URLs.
   * @returns {Array} An array of all URLs.
   */
  GetAllURLs() {
    return this.data.sites.flatMap(site => site.newsUrls);
  }

  /**
   * Gets the URL for a specified news source.
   * @param {string} forSource - The name of the news source.
   * @returns {string|undefined} The URL for the specified source, or undefined if not found.
   */
  GetURL(forSource) {
    const site = this.data.sites.find(s => s.SiteName === forSource);
    return site ? site.newsUrls[0] : undefined;
  }

  /**
   * Gets the source name for a specified URL.
   * @param {string} forURL - The URL of the news source.
   * @returns {string|undefined} The name of the source for the specified URL, or undefined if not found.
   */
  GetSourceName(forURL) {
    const site = this.data.sites.find(s => s.newsUrls.includes(forURL));
    return site ? site.SiteName : undefined;
  }
}

module.exports = NewsSources;
