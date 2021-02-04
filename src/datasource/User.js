const { RESTDataSource } = require('apollo-datasource-rest');
import  config  from '../config';

export class UserApi extends RESTDataSource {

    constructor() {
        super();
        this.baseURL = `${config.serviceUrl}/api/user`;
    }

    loginUser(payload) {
        return this.post('/login', payload);
    }

}
