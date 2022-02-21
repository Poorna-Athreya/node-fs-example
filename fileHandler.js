/* eslint-disable max-len */
const fs = require('fs');

// const removeEmptyObjects = (objects) => {
//   let nonEmptyCopy;
//   for (const [key, value] of Object.entries(objects)) {
//     if (key !== undefined) nonEmptyCopy[key] = value;
//   }
//   return nonEmptyCopy;
// };
const readAndFilterFile = (filename, filterValue = null) => new Promise((resolve, reject) => {
  if (!filename || typeof filename !== 'string' || filename.slice(-4) !== '.txt') reject(new Error('Invalid, enter a proper filepath!'));
  try {
    fs.readFile(filename, (err, data) => {
      if (err) return reject(err);
      if (filterValue) return resolve((data.toString().split('\r\n')).filter((item) => item.toLowerCase().charAt(0) === filterValue.toLowerCase()));
      return resolve(data.toString().split('\r\n'));
    });
  } catch (error) { console.log(error.message); }
});
const getFilesInDirectory = (dirname = 'seed') => new Promise((resolve, reject) => {
  fs.readdir(dirname, async (err, files) => {
    const allFiles = [];
    if (err) return reject(new Error('Cannot Read Directory!'));
    try {
      files.forEach((file) => {
        if (file.slice(-4) === '.txt') {
          allFiles.push(file);
        }
      });
    } catch (error) { console.log(error.message); }
    return resolve(await allFiles);
  });
});
const putFilesIntoObject = async (dirname = 'seed', filterValue = null) => {
  const fileNames = await getFilesInDirectory(dirname);
  const fileContent = {};
  await Promise.all(fileNames.map(async (file) => {
    const results = await readAndFilterFile(`${dirname}\\${file}`, filterValue);
    const key = file.slice(0, -4);
    fileContent[key] = results;
  }));
};
putFilesIntoObject();
// async function main() {
//   const fruits = await readAndFilterFile('files\\fruits.txt');
//   console.log('Fruits: ', fruits);
// }
// main();
module.exports = {
  readAndFilterFile,
  getFilesInDirectory,
  putFilesIntoObject,
};
