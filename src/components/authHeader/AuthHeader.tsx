import { useCallback, useState } from 'react';
import { googleLogout } from '@react-oauth/google';
import { FacebookLoginClient } from '@greatsumini/react-facebook-login';

import Modal from '../modal/Modal';

import { userInit, useUser } from '../../hooks/AuthContext';
import { saveToStorage } from '../../helpers';

import style from './AuthHeader.module.scss';

const AuthHeader = () => {
  const { user, logOut } = useUser();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const onClick = () => {
    if (user.auth) {
      googleLogout();
      FacebookLoginClient.logout(() => {});
      logOut && logOut();

      saveToStorage('user', userInit);
    } else {
      openModal();
    }
  };

  return (
    <header className={style.header}>
      <div className={style.container}>
        <span className={style.userName}>{user.name}</span>
        <button className={style.btn} onClick={onClick} type="button">
          <span className={style.btn__text}>
            {user.auth ? 'Logout' : 'Login'}
          </span>
        </button>
      </div>
      {isOpen && <Modal closeModal={closeModal} />}
    </header>
  );
};
export default AuthHeader;
