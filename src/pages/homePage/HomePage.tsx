import { useEffect, useState, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';

import RickAndMorty from '../../services/API';
import TitleLogo from '../../img/title.png';
import SearchBar from '../../components/searchBar/SearchBar';
import CharList from '../../components/charList/CharList';
import Loader from '../../components/loader/Loader';

import { initStorage, saveToStorage } from '../../helpers';

import { ICharListItem, STATE_MACHINE } from '../../types';
import style from './HomePage.module.scss';

const API = new RickAndMorty();

export default function HomePage() {
  const [chars, setChars] = useState<ICharListItem[]>(initStorage('chars', []));
  const [query, setQuery] = useState<string>(initStorage('query', ''));
  const [state, setState] = useState(STATE_MACHINE.PENDING);

  const onHandleInputChange = useCallback((query: string) => {
    setQuery(query.trim());
  }, []);

  useEffect(() => {
    if (chars.length === 0 && STATE_MACHINE.PENDING) {
      fetchChars();
    }
    if (state !== STATE_MACHINE.RESOLVED) {
      setState(STATE_MACHINE.RESOLVED);
    }
    if (state !== STATE_MACHINE.PENDING) {
      fetchChars(query);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const fetchChars = useCallback(async (query?: string) => {
    setState(STATE_MACHINE.LOADING);
    API.resetPage();
    const charList = await API.getCharactersByName(query);
    if (charList && charList.results.length > 0) {
      saveToStorage('chars', charList?.results);
      setChars(charList?.results);
      setState(STATE_MACHINE.RESOLVED);
    } else {
      setState(STATE_MACHINE.REJECTED);
      saveToStorage('chars', []);
      setChars([]);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  });

  const onScroll = (e: Event) => {
    const document = e.target as Document;
    const pxToBottom =
      document.documentElement.scrollHeight -
      (window.document.documentElement.scrollTop + window.innerHeight);
    if (pxToBottom < 100 && state !== STATE_MACHINE.LOADING) {
      fetchNewChars(query);
    }
  };

  const fetchNewChars = async (query: string) => {
    if (chars.length < API.amount && API.amount !== 0) {
      API.increasePage();
      setState(STATE_MACHINE.LOADING);
      const charList = await API.getCharactersByName(query);
      if (charList && charList.results.length > 0) {
        setChars(p => [...p, ...charList?.results]);
        saveToStorage('chars', chars);
        setState(STATE_MACHINE.RESOLVED);
      } else {
        setState(STATE_MACHINE.REJECTED);
      }
    }
  };

  const emptyMessage = <h2 className={style.emptyList}>Nothing found</h2>;
  return (
    <>
      <Helmet>
        <title>Rick & Morty</title>
      </Helmet>
      <div className={style.header}>
        <img
          className={style.headerLogo}
          src={TitleLogo}
          alt="Rick and morty logo"
        />
      </div>
      <section className={style.section}>
        <SearchBar
          query={query}
          onSubmit={fetchChars}
          setQuery={onHandleInputChange}
        />
        {state === STATE_MACHINE.LOADING && <Loader />}
        {state !== STATE_MACHINE.REJECTED && <CharList charsData={chars} />}
        {state === STATE_MACHINE.REJECTED && emptyMessage}
        {chars.length >= API.amount && emptyMessage}
      </section>
    </>
  );
}
