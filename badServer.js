// A server that fails all connections for testing purposes

const jsonServer = require("json-server");

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

router.render = (req, res) => {
  res.sendStatus(500);
};

server.use(middlewares);
server.use(router);
server.listen(8080, () => {
  console.log("A bad JSON Server is running");
});
