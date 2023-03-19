import { createContext, FC, useCallback, useContext, useState } from 'react';
import { initStorage, saveToStorage } from '../helpers';
import { IUser, IUserContext } from '../types';

export const userInit = {
  name: '',
  auth: false,
  picture: '',
};

interface IProps {
  children: JSX.Element;
}
export const AuthContext = createContext<IUserContext | null>(null);

const UserProvider: FC<IProps> = ({ children }) => {
  const [user, setUser] = useState<IUser>(() => initStorage('user', userInit));

  const logIn = useCallback(
    ({ name, picture }: IUser) => {
      setUser({ name, picture, auth: true });
      saveToStorage('user', { name, picture, auth: true });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  const logOut = useCallback(() => {
    setUser(userInit);
  }, []);

  return (
    <AuthContext.Provider value={{ user, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useUser = () => useContext(AuthContext) as IUserContext;

export default UserProvider;
