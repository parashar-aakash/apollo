import { RESTDataSource } from 'apollo-datasource-rest';
import config from '../config/configurations';

export class TraineeApi extends RESTDataSource {

    constructor() {
        super();
        this.baseURL = `${config.serviceUrl}/api/trainee`;
    }

    willSendRequest(request) {
        request.headers.set('authorization', this.context.token);
    }

    async getAll() {
        return this.get('/getall');
    }

    createTrainee(user) {
        const newTrainee = { ...user };
        return this.post('/create', newTrainee);
    }

    updateTrainee(body) {
        const traineeupdate = { ...body };
        return this.put('/update', traineeupdate);
    }

    deleteTrainee(id) {
        const path = '/remove/'.concat(id);
        return this.delete(path);
    }
}
