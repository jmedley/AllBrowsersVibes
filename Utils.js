const fs = require("fs").promises;
const path = require("node:path");

/**
 * PUBLIC FUNCTIONS
 */

/**
 * Recursively builds an unordered HTML list of links for all files under rootPath.
 * Rule: if a file is named "index.md", link text is its parent directory name.
 *
 * @param {string} rootPath - Absolute or relative root directory to scan.
 * @returns {Promise<string>} HTML string like: <ul><li><a ...>...</a></li>...</ul>
 */
async function buildFileLinksList(rootPath) {
  async function walk(dir) {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    const files = [];

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        files.push(...(await walk(fullPath)));
      } else if (entry.isFile()) {
        files.push(fullPath);
      }
    }

    return files;
  }

  const allFiles = await walk(rootPath);

  const items = allFiles
    .sort((a, b) => a.localeCompare(b))
    .map((filePath) => {
      const fileName = path.basename(filePath);
      const parentDirName = path.basename(path.dirname(filePath));
      const linkText = fileName === "index.md" ? parentDirName : fileName;

      // href relative to root, normalized for web URLs
      const href = path.relative(rootPath, filePath).split(path.sep).join("/");

      return ` <li><a href="${escapeHtml(href)}">${escapeHtml(linkText)}</a></li>`;
    });

  return `<ul>\n${items.join("\n")}\n</ul>`;
}

/**
 * Converts an input string to a path.
 *
 * @param {string} inputString - The input string to convert.
 * @returns {string} The converted path.
 */

function convertToPath(inputString, base = "./") {
  let temporary = inputString.replace(".", "/");
  temporary = path.join(base, temporary);
  return temporary;
}

/**
 * Creates an HTML anchor link element as a string.
 *
 * @param {string} path The URL/path the link should point to.
 * @param {string} linkText The text content of the link.
 * @returns {string} A string representing the HTML anchor tag.
 */
function createHtmlLink(path, linkText) {
  // Use template literals for clean string interpolation
  return `<a href="${path}">${linkText}</a>`;
}

/**
 * Strips comments from JSONC content to make it valid JSON.
 * @param {string} jsonc - The JSONC string.
 * @returns {string} The JSON string without comments.
 */
function stripJsoncComments(jsonc) {
  // Remove // comments (lines starting with optional whitespace then //)
  jsonc = jsonc.replace(/^\s*\/\/.*$/gm, '');
  // Remove /* */ comments
  jsonc = jsonc.replace(/\/\*[\s\S]*?\*\//g, '');
  return jsonc;
}

/**
 * PRIVATE FUNCTIONS
 */

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Example:
// buildFileLinksList("/home/jmedley/repos/MDNDrafts")
// .then(console.log)
// .catch(console.error);

module.exports = {
  buildFileLinksList,
  convertToPath,
  createHtmlLink,
  stripJsoncComments,
};
