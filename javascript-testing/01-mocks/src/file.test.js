const File = require('./file')
const { ERROR } = require('./constants')
const { rejects, deepStrictEqual } = require('assert')

async function test() {
  {
    const filePath = '../mocks/empty-file.csv';
    const result = File.csvTojson(filePath);
    const rejection = new Error(ERROR.FILE_LENGTH_ERROR_MESSAGE);
    await rejects(result, rejection);
  }
  {
    const filePath = '../mocks/invalid-header.csv';
    const result = File.csvTojson(filePath);
    const rejection = new Error(ERROR.FILE_FIELDS_ERROR_MESSAGE);
    await rejects(result, rejection);
  }
  {
    const filePath = '../mocks/valid-file.csv';
    const model = {
      id: parseInt,
      name: (string) => String(string).trim(),
      profession: (string) => String(string).trim(),
      age: parseInt,
    };
    const result = await File.csvTojson(filePath, model);
    const expected = [
      {
        "id": 1,
        "name": "Lucas Santos",
        "profession": "Tech Lead",
        "age": 22
      },
      {
        "id": 2,
        "name": "Jean Cigoli",
        "profession": "Tech Lead",
        "age": 22
      },
      {
        "id": 3,
        "name": "Davi Soares",
        "profession": "Future Tech Lead",
        "age": 21
      }
    ];

    deepStrictEqual(result, expected);
  }

}

test();