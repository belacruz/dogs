import React from 'react';
import { useParams } from 'react-router-dom';
import Feed from '../Feed/Feed';

const UserProfile = () => {
  const { username } = useParams();
  console.log(username);

  return (
    <section className="container mainSection">
      <h1 className="title">{username}</h1>
      <Feed home={false} username={username} />
    </section>
  );
};

export default UserProfile;
