const methods = require("methods");
const server = require("./server");

const app = server();

const router = app.router();

router.get("/hello", (_, response) => {
  response.json({ message: "hello word!" });
});

router.post("login", (_, response) => {
  response.json({ message: "Login successfully!" });
});

app.listen(3000, () => {
  console.log("Server on!");
});

module.exports = app.server;
