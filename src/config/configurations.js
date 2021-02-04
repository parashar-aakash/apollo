
import * as dotenv from 'dotenv';
const envVars = dotenv.config();

const config = {
    port: envVars.parsed.PORT,
    serviceUrl: envVars.parsed.SERVICE_URL
};

Object.freeze(
    config
);

export default config;
