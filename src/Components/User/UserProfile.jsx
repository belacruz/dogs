import React from 'react';
import { useParams } from 'react-router-dom';
import Feed from '../Feed/Feed.jsx';
import Head from '../Helper/Head.jsx';

const UserProfile = () => {
  const { username } = useParams();

  return (
    <section className="container mainSection">
      <Head title={username} />
      <h1 className="title">{username}</h1>
      <Feed home={false} username={username} />
    </section>
  );
};

export default UserProfile;
