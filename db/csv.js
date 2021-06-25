const fs = require('fs');
const path = require('path');
const LineInputStream = require('line-input-stream');

let readStream = LineInputStream(fs.createReadStream(path.join(__dirname, '../data/photos.csv'), { flags: "r" }));
let writeStream = fs.createWriteStream(path.join(__dirname, '../data/photosClean.csv'), { flags: "w" });

readStream.setDelimiter('\n');

readStream.on('line', (line) => {
  if (line[line.length - 1] !== '"') {
    line += '"';
    console.log('line', line);
  }
  writeStream.write(line + '\n');
  writeStream.on('error', (err) => {
    console.log('error writing CSV', err);
  });

});

readStream.on('error', (err) => {
  console.log('error reading CSV', err);
});
