const { writeFile } = require("node:fs/promises");

async function createFile(path, data, callback) {
  await writeFile(path, data)
    .then(() => {
      callback();
    })
    .catch((error) => {
      console.log(`No se pudo crear el archivo '${path}'`);
      console.log(error);
      process.exit(1);
    });
}

module.exports = {
  createFile,
};
