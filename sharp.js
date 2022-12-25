const path = require("path");
const sharp = require("sharp");
const { v4 } = require("uuid");

class Resize {
  constructor(folder) {
    this.folder = folder;
  }

  async save(buffer) {
    const fileName = Resize.fileName();
    const filePath = this.filePath(fileName);
    await sharp(buffer)
      .resize(300, 300, {
        withoutEnlargement: true,
      })
      .toFile(filePath);
    return fileName;
  }

  static fileName() {
    return `${v4()}.png`;
  }

  filePath(fileName) {
    return path.resolve(`${this.folder}/${fileName}`);
  }
}

module.exports = Resize;
