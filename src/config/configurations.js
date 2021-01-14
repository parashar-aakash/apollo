import * as dotenv from 'dotenv';
console.log(dotenv.config());
const envVar = dotenv.config().parsed;
console.log(envVar);
const config = {
  PORT: envVar.PORT,
};
export default config;
