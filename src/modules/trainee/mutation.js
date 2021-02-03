import userInstance from '../../service/user';
import instancePubSub from '../pubsub';
import constant from '../../lib/constant';

export default {
    createTrainee: async (parent,args,context)=>{
        const {user} = args;
        const { dataSources: { traineeApi } } = context;
        const response = await traineeApi.createTrainee(user);
       // console.log('response is', response);
        instancePubSub.publish(constant.subscriptions.TRAINEE_ADDED, { traineeAdded: response.data });
        return response.data;
    },

    updatedTrainee: async (parent , args ,context ) => {
      const { id, dataToUpdate } = args;
    const { dataSources: { traineeApi } } = context;
    const response = await traineeApi.updateTrainee({ id, dataToUpdate });
    console.log(response);
    instancePubSub.publish(constant.subscriptions.TRAINEE_UPDATED, { traineeUpdated: response.data });
      return response.data;
    },

    deleteTrainee: async (parent,args,context) => {
        const { id } = args;
        const { dataSources: { traineeApi } } = context;
        const response = await traineeApi.deleteTrainee(id);
        console.log('for delete',response)
        instancePubSub.publish(constant.subscriptions.TRAINEE_DELETED, { traineeDeleted: response });
        return response;

    },
 };
 