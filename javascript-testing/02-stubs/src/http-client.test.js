const { HttpClient, Response } = require('./http-client')
const { deepStrictEqual } = require('assert')
const sinon = require('sinon')

const URL_1 = 'https://swapi.dev/api/planets/2?format=json';
const URL_2 = 'https://swapi.dev/api/planets/1?format=json';

const mocks = {
  tatooine: require('../mocks/tatooine.json'),
  alderaan: require('../mocks/alderaan.json')
}

async function main() {
  {
    const client = new HttpClient()
    const stub = sinon.stub(client, client.request.name)

    const responseFromUrl1ToBuffer = Buffer.from(JSON.stringify(mocks.tatooine), 'utf-8')
    const responseFromUrl2ToBuffer = Buffer.from(JSON.stringify(mocks.alderaan), 'utf-8')

    stub
      .withArgs(URL_1, 'GET')
      .resolves(new Response(responseFromUrl1ToBuffer))

    stub
      .withArgs(URL_2, 'GET')
      .resolves(new Response(responseFromUrl2ToBuffer))

    const response = await client.request(URL_1, 'GET')
    deepStrictEqual(response.toJson(), mocks.tatooine)
  }
}

main()
