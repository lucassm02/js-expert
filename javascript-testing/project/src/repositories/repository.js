const { join } = require("path");
const { readFile } = require("fs/promises");

class Repository {
  #filePath = null;

  constructor({ filename }) {
    this.#filePath = join(__dirname, "..", "..", "database", filename);
  }

  async #getContent() {
    const fileContent = await readFile(this.#filePath);
    return JSON.parse(fileContent);
  }

  async findById(id) {
    const content = await this.#getContent();
    return content.find(({ id: recordId }) => recordId === id);
  }

  async getAll() {
    const content = await this.#getContent();
    return content;
  }
}

module.exports = Repository;
