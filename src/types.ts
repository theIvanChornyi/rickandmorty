export enum STATE_MACHINE {
  PENDING = 'pending',
  LOADING = 'loading',
  RESOLVED = 'resolved',
  REJECTED = 'rejected',
}

export interface IRespInfo {
  count: number;
  next: string;
  pages: number;
  prev: string | null;
}

export interface ICharLocation {
  name: string;
  url: string;
}

export interface ICharOrigin extends ICharLocation {}

export interface ICharListItem {
  id: number;
  name: string;
  status: string;
  species: string;
  created: string;
  episode: string[];
  gender: string;
  image: string;
  location: ICharLocation;
  origin: ICharOrigin;
  type: string;
  url: string;
}
export type IRespResult = ICharListItem[];

export interface IApiData {
  info: IRespInfo;
  results: IRespResult;
}
