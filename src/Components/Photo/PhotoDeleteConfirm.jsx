import React from 'react';
import Button from '../Forms/Button';
import styles from './PhotoDeleteConfirm.module.css';

const PhotoDeleteConfirm = ({ onConfirm, onCancel, loading }) => {
  return (
    <div className={`animeLeft ${styles.caixa}`}>
      <div className={styles.conteudo}>
        <p>Tem certeza que deseja deletar a foto?</p>
        <div className={styles.botoes}>
          <Button onClick={onConfirm} disabled={loading}>
            {loading ? 'Deletando...' : 'Sim'}
          </Button>
          <Button onClick={onCancel}>Não</Button>
        </div>
      </div>
    </div>
  );
};

export default PhotoDeleteConfirm;
