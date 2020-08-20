export default class TestifyApi {
  _base = "http://192.168.1.16:3000";
  //__base = 'http://localhost:3000'

  get = async url => {
    return fetch(this._base + url, {
      method: "get",
      credentials: "include",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      }
    });
  };

  post = async (body, url) => {
    return fetch(this._base + url, {
      method: "post",
      credentials: "include",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });
  };
}
