const User = require('../model/user.model');
const ObjectId = require('mongoose').Types.ObjectId();
const UserController = require('../controller/user.controller');

const resolvers = {
    Query: {
        users: UserController.users,
        user: UserController.user,
    },
    Mutation: {
        newUser: UserController.signUp,
        updateUser: UserController.updateUser,
        deleteUser: UserController.deleteUser,
    },
};

module.exports = resolvers;