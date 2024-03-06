const connect = require("connect");
const serveStaticMiddleware = require('./middlewares/static')
const resolveConfig = require('../config')

async function createServer() {
  const config = await resolveConfig()
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
  middlewares.use(serveStaticMiddleware(config))
  return server;
}
exports.createServer = createServer;