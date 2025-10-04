import React from 'react';
import UserHeaderNav from './UserHeaderNav';
import styles from './UserHeader.module.css';
import { useLocation, useParams } from 'react-router-dom';

const UserHeader = () => {
  const [title, setTitle] = React.useState('');
  const { pathname } = useLocation();

  React.useEffect(() => {
    switch (pathname) {
      case '/conta/postar':
        setTitle('Poste sua Foto');
        break;
      case '/conta/estatisticas':
        setTitle('Estatísticas');
        break;
      default:
        setTitle('Minha Conta');
    }
  }, [pathname]);

  return (
    <header className={styles.header}>
      <h1 className={`title ${styles.titulo}`}>{title}</h1>
      <UserHeaderNav />
    </header>
  );
};

export default UserHeader;
