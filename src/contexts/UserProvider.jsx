import { createContext, useState, useEffect, useContext } from 'react';
import { getStoredUsername } from '../utils/api';
import { FeedbackContext } from './FeedbackProvider';
import { authRequests, profileRequests } from '../utils/requests';

export const UserContext = createContext();
export default function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const { setError } = useContext(FeedbackContext);

  useEffect(() => {
    const username = getStoredUsername();
    if (!username) return;

    setLoading(true);
    profileRequests
      .getProfileByName(username)
      .then((data) => {
        setUser(data);
      })
      .catch((e) => console.error(e))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  async function login(body) {
    setLoading(true);
    setError(null);
    try {
      const data = await authRequests.login(body);

      if (data) {
        setUser(data);

        localStorage.setItem(
          'user',
          JSON.stringify({
            name: data.name,
            token: data.accessToken,
          })
        );
        setLoading(false);
        setError(null);
        return true;
      }
    } catch (e) {
      setError(e?.response?.data?.errors?.[0].message);
    }
    setLoading(false);
  }

  // register doesn't return token, so we can't set user here
  async function register(body) {
    setLoading(true);
    setError(null);
    try {
      const data = await authRequests.register(body);

      if (data) {
        setError(null);
        setLoading(false);
        return data;
      }
    } catch (e) {
      setError(e?.response?.data?.errors?.[0].message);
    }

    setLoading(false);
  }

  async function logout() {
    setUser(null);
    localStorage.removeItem('user');
  }

  return (
    <UserContext.Provider value={{ user, login, logout, register, loading, setUser }}>{children}</UserContext.Provider>
  );
}
