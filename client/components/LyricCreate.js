/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { SONG_DETAIL } from '../queries';

const ADD_LYRIC = gql`
  mutation ADD_LYRIC($content: String!, $songId: ID!) {
    addLyricToSong(content: $content, songId: $songId) {
      id
      title
    }
  }
`;

const LyricCreate = ({ song }) => {
  const [songLyric, setSongLyric] = useState('');
  const { id } = song;

  const onSubmit = (addLyricToSong, e) => {
    e.preventDefault();
    addLyricToSong({
      variables: {
        content: songLyric,
        songId: id,
      },
    }).then(res => {
      if (res.data.addLyricToSong) {
        setSongLyric('');
      }
    });
  };
  return (
    <Mutation
      refetchQueries={[{ query: SONG_DETAIL, variables: { id } }]}
      mutation={ADD_LYRIC}
      variables={{ content: songLyric, songId: id }}
    >
      {(addLyricToSong, { error }) => (
        <form onSubmit={e => onSubmit(addLyricToSong, e)}>
          <label htmlFor="songLyric">
            Add a Lyric
            <input
              id="songLyric"
              value={songLyric}
              onChange={e => setSongLyric(e.target.value)}
            />
          </label>
          <button type="submit">Add Line</button>
        </form>
      )}
    </Mutation>
  );
};
export default LyricCreate;
