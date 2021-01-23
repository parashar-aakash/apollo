import express from 'express';
import { createServer } from 'http';
import { ApolloServer } from 'apollo-server-express';

class Server {
    constructor(config) {
        this.config = config;
        this.app = express();
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

    async setupApollo(schema) {
        try {
        const { app } = this;

        this.Server = new ApolloServer({
            ...schema,
            onHealhCheck: () => new Promise((resolve) => {
                resolve('Route is running');
            }),
        });
        this.Server.applyMiddleware({ app });
        this.httpServer = createServer(app);
        this.Server.installSubscriptionHandlers(this.httpServer);
        this.run();   
    } catch (err) {
        console.log(err);
      }
    }

    run() {
        const { app, config: { port } } = this;
       this.httpServer.listen(port, (err) => {
            if(err) {
                console.log(err);
            }
            else {
            console.log(`App is running on PORT ${ port }`);
            }
            return this;
        });
    }
}

export default Server;
