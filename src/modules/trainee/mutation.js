 
import userInstance from '../../service/user';

export default {
    createTrainee: (parent,args,context)=>{
        const {user} = args;
        return userInstance.createUser(user);
    },

    updateTrainee:(parent , args ,context ) =>{
        const{ id , email, role } = args;
        return userInstance.updateUser(id, email, role);

    },
    
    deleteTrainee:(parent,args,context) => {
        const { id } = args;
        const del = userInstance.delete(id);
        console.log(del, 'return');
        return del;
    }
 }
 