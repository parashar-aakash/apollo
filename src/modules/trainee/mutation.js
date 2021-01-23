import userInstance from '../../service/user';
import instancePubSub from '../pubsub';
import constant from '../../lib/constant';

export default {
    createTrainee: (parent,args,context)=>{
        const {user} = args;
        const newTrainee = userInstance.createUser(user);
        instancePubSub.publish(constant.subscriptions.TRAINEE_ADDED, { traineeAdded: newTrainee });
        return newTrainee;
    },

    updateTrainee: (parent , args ,context ) => {
        const{ id , email, role } = args;
        const updateTraine = userInstance.updateUser(user);
        instancePubSub.publish(constant.subscriptions.TRAINEE_UPDATED, { traineeUpdated: updateTraine });
         return updateTraine;

    },
    
    deleteTrainee:(parent,args,context) => {
        const { id } = args;
        const deleteTraine = userInstance.delete(id);
        instancePubSub.publish(constant.subscriptions.TRAINEE_DELETED, { traineeDeleted: deleteTraine.id });
        return deleteTraine;
    },
 }
