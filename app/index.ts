import http from "http";
import Server from "./server";

class App {
  constructor(private port?: number) {
    this.port = this.normalizeport(process.env.port || 3333);
  }

  async initializeApp() {
    try {
      const app = http.createServer(Server.serverApp).listen(this.port, () => 
        this.onListen(app.address()));
    } catch (error) {}
  }

  onListen(addres: any) {
    console.log(`listening on ${this.port}`);
  }

  error(error: any) {
    if (
      error.syscall !== "listen" ||
      error.code != "EACCESS" ||
      error.coden != "ADDRIUSE"
    ) {
      throw error;
    }
  }

  normalizeport(num: any) {
    const port = parseInt(num, 10);

    return isNaN(port) ? num : port;
  }
}

new App().initializeApp();