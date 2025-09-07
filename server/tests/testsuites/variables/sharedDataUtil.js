const fs = require('fs');
const path = require('path');

const sharedDataPath = path.join(__dirname, 'sharedVariables.json');

const writeSharedData = (data) => {
  console.log("Write Data in the shared file - " + JSON.stringify(data, null, 2));
  fs.writeFileSync(sharedDataPath, JSON.stringify(data, null, 2));
};

const readSharedData = () => {
  if (!fs.existsSync(sharedDataPath)) return {};
  const raw = fs.readFileSync(sharedDataPath);
  return JSON.parse(raw);
};

module.exports = {
  writeSharedData,
  readSharedData
};
