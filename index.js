const { existsSync } = require("node:fs");
const { mkdir } = require("node:fs/promises");
const { readFile } = require("node:fs");
const { dirname } = require('path')

// Utils
const { createFile } = require("./utils/createFile");

const path = process.argv[2] ?? "";
const content = process.argv[3] ?? "";

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
  const isPath = path.split("").includes(".");

  if (!isPath)
    return callback("No se ha especificado el path del archivo", null);
  if (!existsSync(path)) return callback(null, 0);
  if (!word) return callback("No se ha especificado la palabra a buscar", null);

  readFile(path, "utf-8", (err, result) => {
    let wordCounter = 0;
    result.split(" ").forEach((val) => {
      if (val.toLowerCase() !== word.toLowerCase()) return;
      wordCounter += 1;
    });
    return callback(err, wordCounter);
  });
}
// readFileAndCount(content, (err, count) => {
//   if (err) console.log(err);
//   console.log(count);
// });

module.exports = {
  writeFile,
  readFileAndCount,
};
