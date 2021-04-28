class SocketWrapper {
  constructor(url) {
    this.url = url;
  }

  init(token) {
    this.socket = new WebSocket(`${this.url}?token=${token}`);
  }
}

export default SocketWrapper;
