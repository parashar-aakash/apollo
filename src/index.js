import Server from './server';
import config from './config/configurations';
import schema from './modules';

const server = new Server(config);

(() => {
  server.bootstrap().setApollo(schema);
})();
