/* eslint-disable react/prop-types */
import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import { SONG_LIST } from '../queries';

const ADD_LIKES = gql`
  mutation ADD_LIKES($id: ID!) {
    likeLyric(id: $id) {
      likes
      id
    }
  }
`;

const LyricLine = ({ lyric }) => {
  const addLikes = likeLyric => {
    likeLyric({
      variables: {
        id: lyric.id,
      },
    });
  };
  return (
    <Mutation
      refetchQueries={[{ query: SONG_LIST }]}
      mutation={ADD_LIKES}
      variables={{ id: lyric.id }}
    >
      {(likeLyric, { error }) => (
        <li className="collection-item" key={lyric.id}>
          {lyric.content}
          {'  '}
          <span
            tabIndex="0"
            role="button"
            onKeyDown={() => addLikes(likeLyric)}
            onClick={() => addLikes(likeLyric)}
          >
            Likes: {lyric.likes}
          </span>
        </li>
      )}
    </Mutation>
  );
};
export default LyricLine;
