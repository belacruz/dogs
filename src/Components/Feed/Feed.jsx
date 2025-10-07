import React from 'react';
import FeedModal from './FeedModal';
import FeedPhotos from './FeedPhotos';
import { UserContext } from '../../UserContext';
import Head from '../Helper/Head';

const Feed = ({ home, username }) => {
  const { modalPhoto, setModalPhoto, setPages, infinite } =
    React.useContext(UserContext);

  const bottomBoundaryRef = React.useRef(null);
  const loadingRef = React.useRef(false);
  const observerRef = React.useRef(null);

  const getTitle = () => {
    if (username) return username;
    if (home) return 'Feed';
    return 'Minha Conta';
  };

  React.useEffect(() => {
    if (!infinite) return;

    const handleIntersect = (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting && !loadingRef.current) {
          loadingRef.current = true;
          setPages((pg) => [...pg, pg.length + 1]);
          setTimeout(() => {
            loadingRef.current = false;
          }, 300);
          break;
        }
      }
    };

    const observer = new IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: '200px',
      threshold: 0,
    });
    observerRef.current = observer;

    const el = bottomBoundaryRef.current;
    if (el) observer.observe(el);

    return () => {
      if (observerRef.current && el) {
        try {
          observerRef.current.unobserve(el);
        } catch (e) {}
      }
      observerRef.current = null;
    };
  }, [setPages, infinite]);

  return (
    <div>
      <Head title={getTitle()} />
      {modalPhoto && (
        <FeedModal photo={modalPhoto} setModalPhoto={setModalPhoto} />
      )}
      <FeedPhotos
        setModalPhoto={setModalPhoto}
        home={home}
        username={username}
      />
      <div
        id="page-bottom-boundary"
        ref={bottomBoundaryRef}
        style={{ height: '20px' }}
      />
    </div>
  );
};

export default Feed;
