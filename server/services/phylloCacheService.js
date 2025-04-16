const fs = require('fs');
const path = require('path');

const cachePath = path.join(__dirname, '../cache/phyllo');
if (!fs.existsSync(cachePath)) fs.mkdirSync(cachePath, { recursive: true });

exports.cachePhylloData = (creatorId, data) => {
  fs.writeFileSync(path.join(cachePath, `${creatorId}.json`), JSON.stringify(data));
};

exports.getCachedPhylloData = (creatorId) => {
  const file = path.join(cachePath, `${creatorId}.json`);
  return fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf-8')) : null;
};
