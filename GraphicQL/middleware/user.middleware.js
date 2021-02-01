const { UserInputError, ApolloError } = require('apollo-server-express');
const UserService = require('../service/user.service');
async function checkSignUp(args, next) {
    try {
        const user = await UserService.searchUser(args);
        if (user) throw new UserInputError('Check your email and username');
        next();
    } catch (error) {
        throw new ApolloError(error);
    }
}

module.exports = { checkSignUp };