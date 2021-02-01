const { gql } = require('apollo-server-express');

const typeDefs = gql `
	type User {
		_id: ID!
		isActive: Boolean
		email: String!
		username: String!
		password: String!
		roles: UserRoleEnum!
	}
	enum UserRoleEnum {
		ADMIN
		USER
	}
	type Query {
		user(email: String, username: String, _id: ID): User
		users(email: String, username: String, _id: ID): [User]
	}
	type Mutation {
		newUser(email: String!, username: String!, password: String!): User
		updateUser(email: String!, username: String!, password: String!): User
		deleteUser(email: String!): String!
	}
`;
module.exports = typeDefs;