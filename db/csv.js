const fs = require('fs');
const path = require('path');
const LineInputStream = require('line-input-stream');

// ------------- PHOTO CLEANER ------------------------------------

// const readPath = path.join(__dirname, '../data/photosOrig.csv');
// const readStream = LineInputStream(fs.createReadStream(readPath, { flags: 'r' }));
// const writePath = path.join(__dirname, '../data/photosClean.csv');
// const writeStream = fs.createWriteStream(writePath, { flags: 'w' });

// readStream.setDelimiter('\n');

// readStream.on('line', (line) => {
//   // console.log('line', line);
//   if ((line.slice(0, 2) !== 'id') && (line[line.length - 1] !== '"')) {
//     line += '"';
//   }
//   writeStream.write(line + '\n');
// });

// writeStream.on('error', (err) => {
//   console.log('error writing CSV', err);
// });

// readStream.on('error', (err) => {
//   console.log('error reading CSV', err);
// });

// ---------------- RELATED CLEANER -------------------------------------

// const readPath = path.join(__dirname, '../data/related.csv');
// const readStream = LineInputStream(fs.createReadStream(readPath, { flags: 'r' }));
// const writePath = path.join(__dirname, '../data/relatedarr.csv');
// const writeStream = fs.createWriteStream(writePath, { flags: 'w' });

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

// ---------------- FEATURES CLEANER -------------------------------------

const readPath = path.join(__dirname, '../data/features.csv');
const readStream = LineInputStream(fs.createReadStream(readPath, { flags: 'r' }));
const writePath = path.join(__dirname, '../data/featuresarr.csv');
const writeStream = fs.createWriteStream(writePath, { flags: 'w' });

readStream.setDelimiter('\n');

let current = '1';
let features = [];
let prodId;
readStream.on('line', (line) => {
  const split = line.split(',');
  let [id, productId, feature, value] = split;
  prodId = productId;
  if (value === 'null') {
    value = 'true';
  }
  if (feature[0] === '"') {
    feature = feature.split('');
    feature.shift();
    feature.pop();
    feature = feature.join('');
  }
  if (value[0] === '"') {
    value = value.split('');
    value.shift();
    value.pop();
    value = value.join('');
  }
  if (id === 'id') {
    // writeStream.write(`${productId},${feature},${value}` + '\n');
    writeStream.write(`${productId},features\n`);
  } else if ((id !== 'id') && (productId === current)) {
    // featArr.push(`{${feature},${value}}`);
    // featArr.push(`${feature},${value}`);
    // features.push(featArr);
    features.push(`'${feature}', '${value}'`);
  } else if ((id !== 'id') && (productId !== current)) {
    writeStream.write(`${current},"{${features}}"` + '\n');
    current = productId;
    features = [];
    // featArr.push(`{${feature},${value}}`);
    // featArr.push(`${feature}, ${value}`);
    // features.push(featArr);
    features.push(`'${feature}', '${value}'`);
  }
});

readStream.on('end', () => {
  writeStream.write(`${prodId},"{${features}}"`);
});

writeStream.on('error', (err) => {
  console.log('error writing CSV', err);
});

readStream.on('error', (err) => {
  console.log('error reading CSV', err);
});
