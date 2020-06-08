import gql from 'graphql-tag';

export const SONG_DETAIL = gql`
  query SONG_DETAIL($id: ID!) {
    song(id: $id) {
      title
      id
      lyrics {
        id
        likes
        content
      }
    }
  }
`;

export const SONG_LIST = gql`
  query {
    songs {
      title
      id
    }
  }
`;
