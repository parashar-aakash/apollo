import instancePubSub from '../pubsub';
import constant from '../../lib/constant';

export default {
    traineeAdded: {
        subscribe: () => instancePubSub.asyncIterator([constant.subscriptions.TRAINEE_ADDED]),
    },
    traineeUpdated: {
        subscribe: () => instancePubSub.asyncIterator([constant.subscriptions.TRAINEE_UPDATED]),
    },
    traineeDeleted: {
        subscribe: () => instancePubSub.asyncIterator([constant.subscriptions.TRAINEE_DELETED]),
    },
};
