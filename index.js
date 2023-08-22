const { existsSync } = require("node:fs");
const { mkdir } = require("node:fs/promises");
const { readFile } = require("node:fs");

// Utils
const { createFile } = require("./utils/createFile");

const path = process.argv[2] ?? "";
const content = process.argv[3] ?? "";

// Ejercicio 2
async function writeFile(filePath, data, callback) {
  const pathArr = filePath.split("/");
  const folder = pathArr.slice(0, pathArr.length - 1).join("/");
  const isRootPath = pathArr.length <= 2;

  if (isRootPath) return createFile(filePath, data, callback);

  if (!existsSync(filePath)) {
    await mkdir(folder, { recursive: true })
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
// writeFile(path, content, () => {
//   console.log("Archivo creado con éxito");
// });

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
// readFileAndCount(content, (err, text) => {
//   if (err) console.log(err);
//   console.log(text);
// });

module.exports = {
  writeFile,
  readFileAndCount,
};
