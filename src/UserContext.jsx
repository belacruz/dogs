import React from 'react';
import { PHOTOS_GET, TOKEN_POST, TOKEN_VALIDATE_POST, USER_GET } from './api';
import { useNavigate } from 'react-router-dom';
import useFetch from './Hooks/useFetch';

export const UserContext = React.createContext();

export const UserStorage = ({ children }) => {
  const [pages, setPages] = React.useState([1]);
  const [data, setData] = React.useState(null);
  const [login, setLogin] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [photos, setPhotos] = React.useState([]);
  const { request } = useFetch();
  const navigate = useNavigate();
  const [modalPhoto, setModalPhoto] = React.useState(null);
  const [infinite, setInfinite] = React.useState(true);

  const userLogout = React.useCallback(async function () {
    setData(null);
    setError(null);
    setLoading(false);
    setLogin(false);
    window.localStorage.removeItem('token');
  }, []);

  async function getUser(token) {
    const { url, options } = USER_GET(token);
    const response = await fetch(url, options);
    const json = await response.json();
    setData(json);
    setLogin(true);
  }

  async function userLogin(username, password) {
    try {
      setError(null);
      setLoading(true);
      const { url, options } = TOKEN_POST({ username, password });
      const tokenRes = await fetch(url, options);
      const response = await tokenRes.json();
      if (!tokenRes.ok) {
        throw new Error(
          `Erro ${tokenRes.status}: ${response.message} ${tokenRes.statusText}`,
        );
      }
      window.localStorage.setItem('token', response.token);
      await getUser(response.token);
      navigate('/conta');
    } catch (error) {
      setError(error.message);
      setLogin(false);
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    async function autoLogin() {
      const token = window.localStorage.getItem('token');
      if (token) {
        try {
          setError(null);
          setLoading(true);
          const { url, options } = TOKEN_VALIDATE_POST(token);
          const response = await fetch(url, options);
          if (!response.ok) throw new Error('Token inválido');
          await getUser(token);
        } catch (error) {
          userLogout();
        } finally {
          setLoading(false);
        }
      } else {
        setLogin(false);
      }
    }
    autoLogin();
  }, [userLogout]);

  const fetchPhotos = React.useCallback(
    async (home, username = null) => {
      const user = home ? 0 : username || data?.id || 0;
      let results = [];
      let merged = [];
      const total = 6;

      try {
        setError(null);
        setPhotos([]);

        if (pages?.length) {
          results = await Promise.all(
            pages.map((p) => {
              const { url, options } = PHOTOS_GET({
                page: p,
                total: total,
                user: user,
              });
              return request(url, options);
            }),
          );

          // ONLY validation: if photos exist but author doesn't match, user is invalid
          if (username && results[0]?.json?.length > 0) {
            const firstPhoto = results[0].json[0];
            if (firstPhoto.author !== username) {
              throw new Error('User not found');
            }
          }

          // REMOVED: empty array check (users with no photos are valid)

          let responseOk = results.some((r) => r.response.ok);
          let jsonLength = results.some((r) => r.json.length < 3);
          if (responseOk && jsonLength) setInfinite(false);

          merged = results.flatMap((r) => r.json);
        }

        if (merged?.length) {
          setPhotos((prev) => {
            const existingIds = new Set(prev.map((x) => x.id));
            const filtered = merged.filter((x) => !existingIds.has(x.id));
            return filtered.length ? [...prev, ...filtered] : prev;
          });
        }
      } catch (err) {
        console.error('UserContext error:', err.message);
        setError(err.message);
      }
    },
    [pages, data?.id, request],
  );

  return (
    <UserContext.Provider
      value={{
        userLogin,
        userLogout,
        data,
        error,
        loading,
        login,
        photos,
        setPhotos,
        fetchPhotos,
        modalPhoto,
        setModalPhoto,
        pages,
        setPages,
        request,
        infinite,
        setInfinite,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
