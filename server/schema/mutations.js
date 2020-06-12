const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLNonNull } = graphql;
const mongoose = require('mongoose');

const Song = mongoose.model('song');
const Lyric = mongoose.model('lyric');
const SongType = require('./song_type');
const LyricType = require('./lyric_type');
const { UserType, UserInputType } = require('./user_type');
const AuthService = require('../services/auth');

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    signup: {
      type: UserType,
      args: {
        input: { type: new GraphQLNonNull(UserInputType) },
      },
      resolve: (parentValue, { input }, req) => {
        const { email, password } = input;
        console.log('signup', input);
        return AuthService.signup({ email, password, req });
      },
    },
    logout: {
      type: UserType,
      resolve: (parentValue, args, req) => {
        const { user } = req;
        console.log('reqqq', req.user);
        req.logout();
        return user;
      },
    },
    login: {
      type: UserType,
      args: { input: { type: new GraphQLNonNull(UserInputType) } },

      resolve: (parentValue, { input }, req) => {
        const { email, password } = input;
        return AuthService.login({ email, password, req });
      },
    },

    addSong: {
      type: SongType,
      args: {
        title: { type: GraphQLString },
      },
      resolve(parentValue, { title }) {
        return new Song({ title }).save();
      },
    },
    addLyricToSong: {
      type: SongType,
      args: {
        content: { type: GraphQLString },
        songId: { type: GraphQLID },
      },
      resolve(parentValue, { content, songId }) {
        return Song.addLyric(songId, content);
      },
    },
    likeLyric: {
      type: LyricType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return Lyric.like(id);
      },
    },
    deleteSong: {
      type: SongType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return Song.remove({ _id: id });
      },
    },
  },
});

module.exports = mutation;
