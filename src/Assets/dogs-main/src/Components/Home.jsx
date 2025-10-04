import React from 'react';
import Feed from './Feed/Feed';

const Home = () => {
  return (
    <section className="container mainContainer">
      <Feed home={true} />
    </section>
  );
};

export default Home;
