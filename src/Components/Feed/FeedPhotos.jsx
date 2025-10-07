import React from 'react';
import FeedPhotosItem from './FeedPhotosItem';
import Error from '../Helper/Error';
import Loading from '../Helper/Loading';
import styles from './FeedPhotos.module.css';
import { UserContext } from '../../UserContext';

const FeedPhotos = ({ setModalPhoto, home, username = null }) => {
  const { photos, loading, error, fetchPhotos, data } =
    React.useContext(UserContext);

  React.useEffect(() => {
    if (home || data?.id || username) {
      fetchPhotos(home, username);
    }
  }, [fetchPhotos, data?.id, home, username]);

  if (error) return <Error error={error} />;
  if (loading) return <Loading />;
  if (photos)
    return (
      <ul className={`animeLeft ${styles.feed}`}>
        {photos.map((photo, index) => (
          <FeedPhotosItem
            index={index}
            key={photo.id}
            photo={photo}
            setModalPhoto={setModalPhoto}
          />
        ))}
      </ul>
    );
  else return null;
};

export default FeedPhotos;
