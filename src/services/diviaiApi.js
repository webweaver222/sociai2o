export default class DiviaiService {
  _base = "http://localhost:3000";

  constructor(url) {
    this._base = url;
  }

  getIndex = async (token) => {
    const myHeaders = new Headers();

    myHeaders.append("Accept", "application/json, text/plain, */*");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("token", token);

    const res = await fetch(this._base + "/", {
      credentials: "include",
      headers: myHeaders,
    });
    return res;
  };

  getResource = async (url, token) => {
    const myHeaders = new Headers();

    myHeaders.append("Accept", "application/json, text/plain, */*");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("token", token);

    const res = await fetch(this._base + url, {
      method: "get",
      credentials: "include",
      headers: myHeaders,
    });

    return res;
  };

  postResource = async (body, url, token) => {
    const myHeaders = new Headers();

    myHeaders.append("Accept", "application/json, text/plain, */*");
    myHeaders.append("Content-Type", "application/json");

    if (token) {
      myHeaders.append("token", token);
    }

    const res = await fetch(this._base + url, {
      method: "post",
      credentials: "include",
      headers: myHeaders,
      body: JSON.stringify(body),
    });

    return res;
  };
}
