import { FC } from 'react';
import CSS from 'csstype';
import { Puff } from 'react-loader-spinner';

import style from './Loader.module.scss';

interface IProps {
  userStyle?: CSS.Properties;
  userClass?: 'string';
}

const Loader: FC<IProps> = ({ userStyle, userClass = '' }) => {
  return (
    <div className={style.loader + userClass} style={userStyle}>
      <Puff
        height="80"
        width="80"
        radius={1}
        color="teal"
        ariaLabel="puff-loading"
        visible={true}
      />
    </div>
  );
};

export default Loader;
