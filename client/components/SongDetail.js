/* eslint-disable react/prop-types */
import React from 'react';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';

import LyricLine from './LyricLine';
import LyricCreate from './LyricCreate';
import { SONG_DETAIL } from '../queries';

// export const SONG_DETAIL = gql`
//   query SONG_DETAIL($id: ID!) {
//     song(id: $id) {
//       title
//       id
//       lyrics {
//         id
//         likes
//         content
//       }
//     }
//   }
// `;

const SongDetail = ({ match }) => (
  <Query query={SONG_DETAIL} variables={{ id: match.params.id }}>
    {({ data, error, loading }) => {
      if (error) return <div>Error</div>;
      if (loading) return <div>Loading...</div>;
      if (data) {
        return (
          <div>
            <Link to="/songs">Back</Link>
            <h4>{data.song.title}</h4>
            <ul className="collection">
              {data.song.lyrics.map(lyric => (
                <LyricLine key={lyric.id} lyric={lyric} />
              ))}
            </ul>
            <LyricCreate song={data.song} />
          </div>
        );
      }
    }}
  </Query>
);
export default SongDetail;
