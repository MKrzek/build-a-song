/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { Link } from 'react-router-dom';
import { SONG_LIST } from './SongList';

const CREATE_SONG = gql`
  mutation CREATE_SONG($title: String) {
    addSong(title: $title) {
      id
      title
    }
  }
`;

const SongCreate = props => {
  const [title, setTitle] = useState('');

  const onSubmit = (e, addSongMutation) => {
    e.preventDefault();

    addSongMutation({
      variables: {
        title,
      },
    }).then(res => {
      if (res.data.addSong) {
        setTitle('');
        props.history.push('/songs');
      }
    });
  };
  return (
    <div>
      <Link to="/songs">Back</Link>
      <h3>Create a New Song</h3>
      <Mutation
        refetchQueries={[{ query: SONG_LIST }]}
        mutation={CREATE_SONG}
        variables={{ title }}
      >
        {(addSong, { loading, error }) => (
          <form onSubmit={e => onSubmit(e, addSong)}>
            <fieldset disabled={loading}>
              <label htmlFor="title">
                Song Title:
                <input
                  id="title"
                  placeholder="Title"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                />
              </label>
            </fieldset>
          </form>
        )}
      </Mutation>
    </div>
  );
};

export default SongCreate;
