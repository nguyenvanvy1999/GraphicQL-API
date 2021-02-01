const UserService = require('../service/user.service');
const {
    UserInputError,
    AuthenticationError,
    ForbiddenError,
    ApolloError,
} = require('apollo-server-express');
const UserMiddleware = require('../middleware/user.middleware');
async function user(obj, args, context, info) {
    try {
        const result = await UserService.searchUser(args);
        return result;
    } catch (error) {
        throw new ApolloError(error);
    }
}
async function users(obj, args, context, info) {
    try {
        const result = await UserService.searchUsers(args);
        return result;
    } catch (error) {}
}
async function signUp(obj, args, context, info) {
    try {
        await UserMiddleware.checkSignUp(args);
        const newUser = await UserService.newUser(args);
        const result = await UserService.insert(newUser);
        return result;
    } catch (error) {
        throw new ApolloError(error);
    }
}
async function sighIn(obj, args, context, info) {}
async function updateUser(obj, args, context, info) {
    try {
        const result = await UserService.editUser(args);
        return result;
    } catch (error) {
        throw new ApolloError(error);
    }
}

async function deleteUser(obj, args, context, info) {
    try {} catch (error) {
        throw new ApolloError(error);
    }
}

module.exports = { user, users, signUp, updateUser, deleteUser };