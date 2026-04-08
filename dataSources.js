const fs = require('fs');
const NewsSources = require('./NewsSources');
const BrowserSources = require('./BrowserSources');

function showUsage() {
  console.log('Usage: node cli.js <command>');
  console.log('Commands: news, browsers');
}

const command = process.argv[2];
if (!command) {
  showUsage();
  process.exit(1);
}

const browserSources = new BrowserSources('data/browser-sources.jsonc');

switch (command) {
  case 'news': {
    const newsSources = new NewsSources('data/news-sources.jsonc');
    let urls = newsSources.getAllURLs();
    urls = [...urls, ...browserSources.getAllURLs()];
    console.log(urls.join(', '));
    break;
  }

  case 'browsers': {
    const urls = browserSources.getAllURLs();
    console.log(urls.join(', '));
    break;
  }

  default: {
    console.error(`Unknown command: ${command}`);
    showUsage();
    process.exit(1);
  }
}
