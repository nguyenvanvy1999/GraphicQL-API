const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const serverConfig = require('./config/constant/server');
const typeDefs = require('./GraphicQL/typedef');
const resolvers = require('./GraphicQL/resolver');
const Mongo = require('./config/setting/mongo/index');
const jwtHelper = require('./GraphicQL/helper/jwt');
const jwtConfig = require('./config/constant/jwt');
const ConstraintDirective = require('graphql-constraint-directive');

const {
    AuthenticationError,
    UserInputError,
} = require('apollo-server-express');
const server = new ApolloServer({
    typeDefs,
    resolvers,
    // context: async({ req, res }) => {
    //     try {
    //         const token = req.headers.authorization || '';
    //         const user = await jwtHelper.verifyToken(token, jwtConfig.ACCESS.SECRET);
    //         console.log(user);
    //         if (!user) throw new AuthenticationError('Please login');
    //         return { user };
    //     } catch (error) {
    //         throw new UserInputError(error);
    //     }
    // },,
});

const app = express();
server.applyMiddleware({ app });
Mongo.connectMongo();
app.listen({ port: serverConfig.port }, () =>
    console.log(
        `🚀 Server ready at http://localhost:${serverConfig.port}${server.graphqlPath}`
    )
);