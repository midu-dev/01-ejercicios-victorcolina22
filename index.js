const { existsSync, write } = require("node:fs");
const { mkdir } = require("node:fs/promises");
const { readFile } = require("node:fs");
const { dirname } = require('path')

// Utils
const { createFile } = require("./utils/createFile");

// Ejercicio 2
async function writeFile(filePath, data, callback) {
  const path = dirname(filePath)
  const isRootPath = filePath === '.'

  if (isRootPath) return createFile(filePath, data, callback);

  if (!existsSync(path)) {

    await mkdir(path, { recursive: true })
      .then((text) => {
        console.log(`Se creó la ruta ${text}`);
      })
      .catch((error) => {
        console.log(`No se pudo crear la ruta '${error}'`);
        process.exit(1);
      });

    createFile(filePath, data, callback);
    return;
  }
}

// Ejercicio 3
async function readFileAndCount(word, callback) {
  const path = process.argv[2] ?? ''
  const isPath = dirname(path) !== '.';

  if (!isPath)
  return callback(new Error("No se ha especificado el path del archivo"), null);
  if (!existsSync(path)) return callback(null, 0);
  if (!word) return callback(new Error("No se ha especificado la palabra a buscar"), null);

  readFile(path, "utf-8", (err, result) => {
    const filterWord = result.split(' ').filter((el) => el.includes(word))
    const wordCounter = filterWord.length
    return callback(err, wordCounter)
  });
}

module.exports = {
  writeFile,
  readFileAndCount,
};
