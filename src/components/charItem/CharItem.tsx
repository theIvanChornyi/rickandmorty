import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ICharListItem } from '../../types';

import style from './CharItem.module.scss';

interface IProps {
  char: ICharListItem;
}
const CharItem: FC<IProps> = ({ char }) => {
  const { pathname } = useLocation();
  const { id, image, name, gender } = char;
  return (
    <li tabIndex={0} className={style.item}>
      <Link tabIndex={-1} to={`/${id}`} state={{ char, pathname }}>
        <div className={style.thumb}>
          <img className={style.picture} src={image} alt={`${name} avatar`} />
        </div>
        <div className={style.description}>
          <span className={style.title}>{name}</span>
          <span className={style.subtext}>{gender}</span>
        </div>
      </Link>
    </li>
  );
};

export default CharItem;
