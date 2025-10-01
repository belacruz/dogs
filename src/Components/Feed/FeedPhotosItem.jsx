import React from 'react';
import styles from './FeedPhotosItem.module.css';
import Image from '../Helper/Image';

const FeedPhotosItem = ({ photo, setModalPhoto }) => {
  const [show, setShow] = React.useState(false);

  function handleClick() {
    setModalPhoto(photo);
  }

  React.useEffect(() => {
    const timeout = setTimeout(() => setShow(true), 50);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <li
      className={`${styles.photo} ${show ? 'animeLeft' : ''}`}
      onClick={handleClick}
    >
      <Image src={photo.src} alt={photo.title} />
      <span className={styles.visualizacao}>{photo.acessos}</span>
    </li>
  );
};

export default FeedPhotosItem;
