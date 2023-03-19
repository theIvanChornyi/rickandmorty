import { FC, useMemo, memo } from 'react';

import { ICharListItem } from '../../types';
import CharItem from '../charItem/CharItem';
import style from './CharList.module.scss';

interface IProps {
  charsData: ICharListItem[];
}

const CharList: FC<IProps> = memo(({ charsData }) => {
  const createItems = useMemo(
    () =>
      charsData.map(char => {
        return <CharItem key={char.id} char={char} />;
      }),
    [charsData]
  );

  return <ul className={style.charList}>{createItems}</ul>;
});

export default CharList;
