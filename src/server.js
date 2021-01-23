import Express from 'express';
import { ApolloServer } from 'apollo-server-express';

class Server {
  constructor(config) {
    this.config = config;
    this.app = Express();
  }

  bootstrap() {
    this.setupRoutes();
    return this;
  }

  setupRoutes() {
    const { app } = this;
    app.get('/', (req, res) => {
      res.send('Route is running');
    });
  }

  async setApollo(schema) {
    try {
      const { app } = this;
      this.Server = new ApolloServer({
        ...schema,
        onHealthCheck: () => new Promise((resolve) => {
          resolve('I am OK');
        }),
      });
      this.Server.applyMiddleware({ app });
      this.run();
    } catch (err) {
      console.log(err);
    }
  }

  run() {
    const { app, config: { PORT } } = this;
    console.log(PORT);
    app.listen(PORT, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`App is runing on port ${PORT}`);
      }
      return this;
    });
  }
}
export default Server;
