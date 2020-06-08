/* eslint-disable react/prop-types */
import React from 'react';
import { Mutation } from 'react-apollo';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import { SONG_LIST } from '../queries';

const DELETE_SONG = gql`
  mutation DELETE_SONG($id: ID!) {
    deleteSong(id: $id) {
      id
    }
  }
`;
const SongItem = ({ song }) => (
  <Mutation
    refetchQueries={[{ query: SONG_LIST }]}
    mutation={DELETE_SONG}
    variables={{ id: song.id }}
  >
    {(deleteSong, { error }) => (
      <li className="collection-item section" key={song.id}>
        <Link to={`/songs/${song.id}`}>{song.title}</Link>
        <button
          type="submit"
          onClick={() => deleteSong({ variables: { id: song.id } })}
          className="btn-floating btn-small red right"
        >
          <i className="material-icons">delete</i>
        </button>
      </li>
    )}
  </Mutation>
);

export default SongItem;
