export default {
    loginUser: async (parent, args, context) => {
        const { payload: { email, password } } = args;
        const { dataSources: { userApi } } = context;
        const response  = await userApi.loginUser({ email, password });
        return response.Data;
    }
}
