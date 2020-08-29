export default class DiviaiService {
  _base = "http://localhost:3000";

  getIndex = async () => {
    const res = await fetch(this._base + "/", {
      credentials: "include"
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
      headers: myHeaders
    });

    return res;
  };

  postResource = async (body, url) => {
    const res = await fetch(this._base + url, {
      method: "post",
      credentials: "include",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    return res;
  };
}
