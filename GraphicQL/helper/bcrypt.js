const bcrypt = require('bcrypt');
const { ApolloError } = require('apollo-server-express');
const bcryptConfig = require('../../config/constant/bcrypt');
async function hash(password, saltRounds) {
    try {
        const result = await bcrypt.hash(password, bcryptConfig.saltRounds);
        return result;
    } catch (error) {
        throw new ApolloError(error);
    }
}
async function compare(password, hash) {
    try {
        const result = await bcrypt.compare(password, hash);
        return result;
    } catch (error) {
        throw new ApolloError(error);
    }
}

module.exports = { hash, compare };