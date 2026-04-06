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

switch (command) {
  case 'news': {
    const newsSources = new NewsSources('data/news-sources.jsonc');
    const urls = newsSources.GetAllURLs();
    console.log(urls.join(', '));
    break;
  }

  case 'browsers': {
    const browserSources = new BrowserSources('data/browser-sources.jsonc');
    const urls = browserSources.GetAllURLs();
    console.log(urls.join(', '));
    break;
  }

  default: {
    console.error(`Unknown command: ${command}`);
    showUsage();
    process.exit(1);
  }
}
