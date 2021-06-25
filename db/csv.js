const fs = require('fs');
const path = require('path');
const LineInputStream = require('line-input-stream');

//------------- PHOTO CLEANER ------------------------------------

let readStream = LineInputStream(fs.createReadStream(path.join(__dirname, '../data/photosOrig.csv'), { flags: "r" }));
let writeStream = fs.createWriteStream(path.join(__dirname, '../data/photosClean.csv'), { flags: "w" });

readStream.setDelimiter('\n');

readStream.on('line', (line) => {
  // console.log('line', line);
  if ((line.slice(0, 2) !== 'id') && (line[line.length - 1] !== '"')) {
    line += '"';
  }
  writeStream.write(line + '\n');
});

writeStream.on('error', (err) => {
  console.log('error writing CSV', err);
});

readStream.on('error', (err) => {
  console.log('error reading CSV', err);
});

//---------------- RELATED CLEANER -------------------------------------
// let readStream = LineInputStream(fs.createReadStream(path.join(__dirname, '../data/related.csv'), { flags: "r" }));
// let writeStream = fs.createWriteStream(path.join(__dirname, '../data/relatedarr.csv'), { flags: "w" });

// readStream.setDelimiter('\n');

// let current = '1';
// let related = [];
// readStream.on('line', (line) => {
//   line = line.split(',');
//   [ id, currentId, relatedId ] = line;

//   if (id === 'id') {
//     writeStream.write(`${id},${currentId},${relatedId}` + '\n');
//   } else if ((id !== 'id') && (currentId === current) && (relatedId !== '0')) {
//     related.push(relatedId);
//   } else if ((id !== 'id') && (currentId !== current) && (relatedId !== '0')) {
//     writeStream.write(`${current},"{${related}}"` + '\n');
//     current = currentId;
//     related = [];
//     related.push(relatedId);
//   }
// });

// readStream.on('end', () => {
//   writeStream.write(`${current},"{${related}}"`);
// })

// writeStream.on('error', (err) => {
//   console.log('error writing CSV', err);
// });

// readStream.on('error', (err) => {
//   console.log('error reading CSV', err);
// });
