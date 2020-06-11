const mongoose = require('mongoose');
const graphql = require('graphql');

const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull } = graphql;
const SongType = require('./song_type');
const LyricType = require('./lyric_type');
const { UserType } = require('./user_type');

const Lyric = mongoose.model('lyric');
const Song = mongoose.model('song');

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    user: {
      type: UserType,
      resolve: (parentValue, args, req) => {
        const { user } = req;
        return user;
      },
    },
    songs: {
      type: new GraphQLList(SongType),
      resolve: async () => {
        const songs = await Song.find({});
        return songs;
      },
    },
    song: {
      type: SongType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return Song.findById(id);
      },
    },
    lyric: {
      type: LyricType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parnetValue, { id }) {
        return Lyric.findById(id);
      },
    },
  }),
});

module.exports = RootQuery;
