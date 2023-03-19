import { createContext, FC, useCallback, useContext, useState } from 'react';
import { IUser } from '../types';

const userInit = {
  name: '',
  auth: false,
};

interface IProps {
  children: JSX.Element;
}
export const AuthContext = createContext({});

const AuthProvider: FC<IProps> = ({ children }) => {
  const [user, setUser] = useState<IUser>(userInit);

  const logIn = useCallback(() => {
    setUser(p => ({ ...p, auth: true }));
  }, []);
  const logOut = useCallback(() => {
    setUser(p => ({ ...p, auth: false }));
  }, []);

  return (
    <AuthContext.Provider value={{ user, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useUser = () => useContext(AuthContext);

export default AuthProvider;
