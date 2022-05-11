const https = require('https')

class Response {
  constructor(data) {
    this.data = data;
  }

  toJson() {
    try {
      return JSON.parse(this.data)
    } catch (error) {
      throw new Error('')
    }
  }

  toString() {
    return String(this.data).toString('utf8');
  }
}

class HttpClient {
  async request(url, method) {
    if (typeof url !== 'string') throw new Error('URL must be a string!')
    if (typeof method !== 'string') throw new Error('METHOD must be a string!')

    return new Promise((resolve, reject) => {
      const lowerCaseMethod = method.toLocaleLowerCase()
      const handler = https[lowerCaseMethod]
      handler(url, (response => {
        response.on('data', (data) => {
          const parser = new Response(data)
          resolve(parser)
        })
        response.on('error', reject)
      }))
    })
  }
}

module.exports = { HttpClient, Response }