import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import RickAndMorty from '../../services/API';

import style from './CharPage.module.scss';
import { ICharListItem } from '../../types';
import ArrowBackIco from '../../components/arrowBackIco/ArrowBackIco';

const API = new RickAndMorty();

export default function CharPage() {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const [char, setChar] = useState<ICharListItem | null>(
    () => state?.char || null
  );

  useEffect(() => {
    if (!char && id) {
      getChar(id);
    }
  });

  const getChar = async (id: string) => {
    const normalizedId = +id;
    if (Number.isNaN(normalizedId)) {
      navigate('404');
    }
    if (typeof normalizedId === 'number') {
      const char = await API.getSingleCharacter(normalizedId);
      if (char) {
        setChar(char);
      }
    }
  };

  const printValue = (value: string | null | undefined): string =>
    value ? value : 'Unknown';
  return (
    <>
      <Helmet>
        <title>{printValue(char?.name)}</title>
      </Helmet>
      <section className={style.section}>
        <Link className={style.backBtn} to={state?.pathname || '/'}>
          <span className={style.backBtn__ico}>
            <ArrowBackIco />
          </span>
          <span className={style.backBtn__text}>GO BACK</span>
        </Link>
        <div className={style.thumb}>
          <img src={char?.image} alt={`${char?.image} avatar`} />
        </div>
        <h1 className={style.charName}>{char?.name}</h1>

        <div className={style.info}>
          <span className={style.info__subtittle}>Informations</span>
          <ul className={style.info__list}>
            <li className={style.info__item}>
              <span className={style.info__item_Title}>Gender</span>
              <span className={style.info__item_Text}>
                {printValue(char?.gender)}
              </span>
            </li>
            <li className={style.info__item}>
              <span className={style.info__item_Title}>Status</span>
              <span className={style.info__item_Text}>
                {printValue(char?.status)}
              </span>
            </li>
            <li className={style.info__item}>
              <span className={style.info__item_Title}>Specie</span>
              <span className={style.info__item_Text}>
                {printValue(char?.species)}
              </span>
            </li>
            <li className={style.info__item}>
              <span className={style.info__item_Title}>Origin</span>
              <span className={style.info__item_Text}>
                {printValue(char?.origin.name)}
              </span>
            </li>
            <li className={style.info__item}>
              <span className={style.info__item_Title}>Type</span>
              <span className={style.info__item_Text}>
                {printValue(char?.type || 'Unknown')}
              </span>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
