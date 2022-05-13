const http = require("http");

class Router {
  #setRoute = null;

  constructor(setRoute) {
    this.#setRoute = setRoute;
  }

  #set(method, path, callback) {
    const pathWithBar = path[0] !== "/" ? `/${path}` : path;
    this.#setRoute({ path: pathWithBar, method, callback });
  }

  get(...params) {
    this.#set("GET", ...params);
  }
  post(...params) {
    this.#set("POST", ...params);
  }
}

class Server {
  server = null;
  routes = [];

  constructor() {
    this.server = http.createServer((...params) => {
      this.#handler(...params);
    });
  }

  #handler(request, response) {
    const utils = {
      json: (object) => {
        response.writeHead(200, { "Content-Type": "application/json" });
        const json = JSON.stringify(object);
        response.end(json);
      },
    };

    const newResponse = Object.assign(response, utils);

    response.writeHead(200, { "Content-Type": "text/html" });

    const { url, method: requestMethod } = request;

    const route = this.routes.find(
      ({ path, method }) => path === url && method === requestMethod
    );

    const handler = route?.callback ?? this.#notFound;

    handler(request, newResponse);
  }

  #notFound(_, response) {
    response.writeHead(404, { "Content-Type": "application/json" });
    const json = JSON.stringify({ message: "Not found" });
    response.end(json);
  }

  #setRoute(route) {
    this.routes = [...this.routes, route];
  }

  router() {
    return new Router((route) => this.#setRoute(route));
  }

  listen(port, callback) {
    this.server.listen(port, callback);
  }
}

function server() {
  return new Server();
}

module.exports = server;
