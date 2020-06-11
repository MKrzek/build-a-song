const mongoose = require('mongoose');
const graphql = require('graphql');

const {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
} = graphql;

const User = mongoose.model('user');

const UserType = new GraphQLObjectType({
  name: 'UserType',
  fields: () => ({
    email: { type: GraphQLString },
    id: { type: GraphQLID },
  }),
});

const UserInputType = new GraphQLInputObjectType({
  name: 'UserSignupInputType',
  fields: () => ({
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  }),
});
module.exports = { UserType, UserInputType };
