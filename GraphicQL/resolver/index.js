const UserResolver = require('./user.resolver');

module.exports = {
    Query: {
        ...UserResolver.Query,
    },
    Mutation: {
        ...UserResolver.Mutation,
    },
};