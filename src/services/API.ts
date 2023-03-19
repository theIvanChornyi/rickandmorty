import axios from 'axios';
import { saveToStorage, initStorage } from '../helpers';
import { IApiData, ICharListItem } from '../types';

export default class RickAndMorty {
  private static instanse: RickAndMorty;
  private _baseUrl = 'https://rickandmortyapi.com/api';
  private _totalPages: number = 0;
  private _page: number = 1;
  private _amount: number = 0;

  constructor() {
    const { total, amount } = initStorage('pages', { total: 0, amount: 1 });
    this._totalPages = total;
    this._amount = amount;

    if (!RickAndMorty.instanse) {
      RickAndMorty.instanse = this;
    }
    return RickAndMorty.instanse;
  }
  public getSingleCharacter = async (id: number) => {
    try {
      const { data } = await axios.get<ICharListItem>(
        `${this._baseUrl}/character/${id}`
      );
      return data;
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.log(e.message);
      }
    }
  };

  public increasePage() {
    if (this._page === this._totalPages) {
      return;
    } else {
      this._page += 1;
    }
  }

  public resetPage() {
    this._page = 1;
  }

  get amount() {
    return this._amount;
  }

  public getCharactersByName = async (name: string = '') => {
    const queryPrams = name ? `&name=${name}` : '';
    try {
      const { data } = await axios.get<IApiData>(
        `${this._baseUrl}/character/?page=${this._page + queryPrams}`
      );
      this._totalPages = data.info.pages;
      this._amount = data.info.count;

      saveToStorage('pages', { total: this._totalPages, amount: this._amount });

      return data;
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.log(e.message);
      }
    }
  };
}
