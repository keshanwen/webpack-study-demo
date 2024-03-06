const connect = require("connect");

async function createServer() {
  const middlewares = connect();
  const server = {
    async listen(port) {
      require("http")
        .createServer(middlewares)
        .listen(port, async () => {
          console.log(`dev server running at: http://localhost:${port}`);
        });
    },
  };
  return server;
}
exports.createServer = createServer;