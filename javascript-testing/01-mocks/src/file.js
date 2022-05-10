const { join } = require('path')
const { readFile } = require('fs/promises')
const { ERROR } = require('./constants')

const DEFAULT_IS_VALID_OPTIONS = { maxLength: 3, headers: ['id', 'name', 'profession', 'age'] }

class File {
  static async csvTojson(filePath, model = {}) {
    const content = await File.getFileContent(filePath);
    const validation = File.isValid(content);
    if (!validation.valid) throw new Error(validation.error);
    const json = File.parseCsvToJson(content);
    return File.serialize(json, model)
  }
  static async getFileContent(filePath) {
    const path = join(__dirname, filePath);
    const content = await readFile(path);
    return content.toString('utf8');
  }
  static isValid(csvSting, options = DEFAULT_IS_VALID_OPTIONS) {
    const [header, ...body] = csvSting.split('\n');

    const headerIsValid = header === options.headers.join(',');
    if (!headerIsValid) return { error: ERROR.FILE_FIELDS_ERROR_MESSAGE, valid: false };

    const bodyIsValid = (body.length > 0 && body.length <= options.maxLength)
    if (!bodyIsValid) return { error: ERROR.FILE_LENGTH_ERROR_MESSAGE, valid: false }

    return { error: null, valid: true, };
  }
  static parseCsvToJson(csvString) {
    const [header, ...body] = csvString.split('\n')
    const headers = header.split(',')

    return body.map((line) => {

      const fields = line.split(',');

      return fields.reduce((acc, curr, index) => {
        return { [headers[index]]: curr, ...acc }
      }, {})
    })
  }
  static serialize(json, model) {
    if (Array.isArray(json)) {
      return json.map(item => File.serialize(item, model))
    }

    const entries = Object.entries(json);

    const serializedEntries = entries.map(([key, value]) => {
      const serializer = model?.[key]
      if (!serializer) return [key, value]
      return [key, serializer(value)]
    })

    return Object.fromEntries(serializedEntries)
  }
}

module.exports = File;