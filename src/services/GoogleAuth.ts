import axios from 'axios';

export default class GoogleAuth {
  private _baseUrl = 'https://www.googleapis.com/oauth2/v1/userinfo';
  private static instanse: GoogleAuth;

  constructor() {
    if (!GoogleAuth.instanse) {
      GoogleAuth.instanse = this;
    }
    return GoogleAuth.instanse;
  }

  public getUserData = async (access_token: string) => {
    const { data } = await axios.get(
      `${this._baseUrl}?access_token=${access_token}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          Accept: 'application/json',
        },
      }
    );
    return data;
  };
}
