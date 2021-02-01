const User = require('../model/user.model');
const mongoose = require('mongoose');
const { ApolloError } = require('apollo-server-express');
const BcryptHelper = require('../helper/bcrypt');
// ________________________________________________
function newUser(user) {
    newUser = {
        _id: mongoose.Types.ObjectId(),
        email: user.email,
        username: user.username,
        password: user.password,
        isActive: false,
    };
    return newUser;
}
async function insert(newUser) {
    try {
        const user = new User(newUser);
        const result = await user.save();
        return result;
    } catch (error) {
        throw new ApolloError(error);
    }
}

async function editUser(user) {
    try {
        const password = await BcryptHelper.hash(user.password);
        const user = await User.findOneAndUpdate({ email: user.email }, { username: user.username, password: password }, { new: true });
        return user;
    } catch (error) {
        throw new ApolloError(error);
    }
}

async function deleteUserByEmail(email) {
    try {
        const result = await User.findOneAndDelete({ email: email });
        return result;
    } catch (error) {
        throw new ApolloError(error);
    }
}

async function activeAccount(email) {
    try {
        const result = await User.findOneAndUpdate({ email: email }, { isActive: true }, { new: true });
        return result;
    } catch (error) {
        throw new ApolloError(error);
    }
}
async function searchUser(user) {
    try {
        const { email, username, _id } = user;
        if (email && username)
            return User.findOne({
                $and: [{ email: email }, { username: username }],
            });
        return User.findOne({
            $or: [{ email: email }, { username: username }, { _id: _id }],
        });
    } catch (error) {
        throw new ApolloError(error);
    }
}
async function searchUsers(users) {
    try {
        const { email, username, _id } = users;
        if (!email && !username && !_id) return User.find();
        return User.find({
            $or: [{ email: email }, { username: username }, { _id: _id }],
        });
    } catch (error) {
        throw new ApolloError(error);
    }
}

module.exports = {
    editUser,
    newUser,
    insert,
    activeAccount,
    deleteUserByEmail,
    editUser,
    searchUser,
    searchUsers,
};