import React from 'react';
import { Query } from 'react-apollo';

import { Link } from 'react-router-dom';
import SongItem from './SongItem';
import { SONG_LIST } from '../queries';

// export const SONG_LIST = gql`
//   query {
//     songs {
//       title
//       id
//     }
//   }
// `;

const SongList = () => (
  <div>
    <Query query={SONG_LIST}>
      {({ data, error, loading }) => {
        console.log('initialData', loading, error, data);
        if (loading) {
          return <div>Loading...</div>;
        }
        if (error) {
          return <div>Error</div>;
        }
        if (data) {
          console.log('songs', data.songs);
          return (
            <div>
              <ul className="collection">
                {data.songs.map(song => (
                  <SongItem key={song.id} song={song} />
                ))}
              </ul>
              <Link
                className="btn-floating btn-large red right"
                to="/songs-new"
              >
                <i className="material-icons">add</i>
              </Link>
            </div>
          );
        }
      }}
    </Query>
  </div>
);

export default SongList;
