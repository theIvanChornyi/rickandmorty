import { FC, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useGoogleLogin } from '@react-oauth/google';
import FacebookLogin from '@greatsumini/react-facebook-login';

import { useUser } from '../../hooks/AuthContext';
import GoogleAuth from '../../services/GoogleAuth';

import style from './Modal.module.scss';
import { IUser } from '../../types';

const modalRoot = document.querySelector('#modal') as HTMLDivElement;
interface IProps {
  closeModal: () => void;
}

const googleApi = new GoogleAuth();
const faceBookId: string = process.env.REACT_APP_FACEBOOK_ID as string;

const Modal: FC<IProps> = ({ closeModal }) => {
  const { logIn } = useUser();
  const onSuccess = async (resp: any) => {
    const { name, picture }: IUser = await googleApi.getUserData(
      resp.access_token
    );
    logIn && logIn({ name, picture });
    closeModal();
  };

  const loginGoogle = useGoogleLogin({
    onSuccess,
    onError: error => console.log('Login Failed:', error),
  });

  const responseFacebook = ({ name, picture }: any) => {
    logIn && logIn({ name, picture: picture.data.url });
  };

  useEffect(() => {
    const closeByKey = (e: KeyboardEvent) => {
      if (e.code === 'Escape') closeModal();
    };
    document.addEventListener('keydown', closeByKey);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', closeByKey);
      document.body.style.overflow = 'unset';
    };
  }, [closeModal]);

  const closeByBackdrop = (e: React.SyntheticEvent) => {
    if (e.currentTarget === e.target) {
      closeModal();
    }
  };

  const combClas = (...args: string[]): string => {
    return args.join(' ');
  };

  return createPortal(
    <div onClick={closeByBackdrop} className={style.backdrop}>
      <div className={style.modal}>
        <button className={style.modalCloseBtn} onClick={closeModal}>
          X
        </button>
        <ul className={style.btnList}>
          <li>
            <button
              className={style.loginBtn}
              type="button"
              onClick={() => loginGoogle()}
            >
              <span
                className={combClas(style.loginBtnIcon, style.google)}
              ></span>
              <span className={style.loginBtnText}>Google</span>
            </button>
          </li>
          <li>
            <FacebookLogin
              appId={faceBookId}
              onProfileSuccess={responseFacebook}
              render={({ onClick }) => (
                <button
                  title="FACEBOOK BAN MY APP URL"
                  disabled
                  // FACEBOOK BAN MY APP URL
                  className={style.loginBtn}
                  type="button"
                  onClick={onClick}
                >
                  <span
                    className={combClas(style.loginBtnIcon, style.facebook)}
                  ></span>
                  <span className={style.loginBtnText}>Facebook</span>
                </button>
              )}
            />
          </li>
        </ul>
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;
