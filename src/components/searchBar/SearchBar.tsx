import { FC, memo } from 'react';

import SearchIco from '../searchIco/SearchIco';

import style from './SearchBar.module.scss';
import { saveToStorage } from '../../helpers';

interface IProps {
  query: string;
  setQuery: Function;
  onSubmit: Function;
}

const SearchBar: FC<IProps> = memo(({ setQuery, query, onSubmit }) => {
  const onHandleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(query);
  };
  const onHandleChange = async (e: React.SyntheticEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    saveToStorage('query', value);
    setQuery(value);
  };

  return (
    <form onSubmit={onHandleSubmit} className={style.form}>
      <button className={style.button} type="submit">
        <SearchIco />
      </button>
      <input
        placeholder="Filter by name..."
        className={style.input}
        name="query"
        type="text"
        value={query}
        onChange={onHandleChange}
      ></input>
    </form>
  );
});

export default SearchBar;
