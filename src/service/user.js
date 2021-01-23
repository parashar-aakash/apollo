class User {
    constructor() {

        this.users = new Map();
        this.id = 0;
    }
    getAll(){
        const details = this.users.values();
        return details;

    }
    
    createUser(user){
        this.id += 1;
        this.users.set(this.id,{ ...user , id : this.id });
        return this.users.get(this.id);
    }

    updateUser(id,email){
        const user = this.user.get(Number(id));
        this.users.set(Number(id),{...user,email });
        return this.users.get(Number(id));
    }

    deleteUser(id) {
        const deleteRecords = this.users.get(Number(id));
        this.users.delete(Number(id));
        return deleteRecords;
    }
}

export default new User();
