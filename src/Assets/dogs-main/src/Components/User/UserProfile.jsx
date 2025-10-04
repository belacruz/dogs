import React from 'react';
import { useParams } from 'react-router-dom';
import Feed from '../Feed/Feed.jsx';

const UserProfile = () => {
  const { username } = useParams();

  return (
    <section className="container mainSection">
      <h1 className="title">{username}</h1>
      <Feed home={false} username={username} />
    </section>
  );
};

export default UserProfile;
