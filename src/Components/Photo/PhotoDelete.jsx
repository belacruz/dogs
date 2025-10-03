import React from 'react';
import styles from './PhotoDelete.module.css';
import { PHOTO_DELETE } from '../../api';
import useFetch from '../../Hooks/useFetch';
import { UserContext } from '../../UserContext';
import PhotoDeleteConfirm from './PhotoDeleteConfirm';

const PhotoDelete = ({ id }) => {
  const { request, loading } = useFetch();
  const { setPhotos, fetchPhotos, setModalPhoto } =
    React.useContext(UserContext);
  const [confirmOpen, setConfirmOpen] = React.useState(false);

  async function handleClick() {
    setConfirmOpen(true);
  }

  async function handleConfirm() {
    setConfirmOpen(false);
    if (loading) return;
    const token = window.localStorage.getItem('token');
    const { url, options } = PHOTO_DELETE(id, token);
    const { response } = await request(url, options);
    if (response.ok) {
      setPhotos((prev) => prev.filter((p) => p.id !== id));
      await fetchPhotos();
      setModalPhoto(null);
    }
  }

  function handleCancel() {
    setConfirmOpen(false);
  }

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        className={styles.delete}
        disabled={loading}
      >
        {loading ? 'Deletando...' : 'Deletar'}
      </button>
      {confirmOpen && (
        <PhotoDeleteConfirm
          loading={loading}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </>
  );
};

export default PhotoDelete;
