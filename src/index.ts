import http from "http";
import Server from "./server";

class App {
<<<<<<< HEAD
  constructor(private port?: number) {
    this.port = this.normalizeport(process.env.port || 3333);
  }

  async initializeApp() {
    try {
      const serverApp = Server.serverApp;
      const app = http.createServer(serverApp).listen(this.port, () => this.onListen( app.address() ) );
    } catch (error) {
      this.error(error);
      console.log(error);
<<<<<<< HEAD
      console.log(error);
=======
>>>>>>> master
    }
  }

  onListen(address: any) {
    console.log(`listening on ${this.port}`);
  }

  error(error: any) {
    if ( error.syscall !== "listen" || error.code !== "EACCESS" || error.coden !== "ADDRINUSE") {
      throw error;
=======
    constructor(private port?: number) {
        this.port = this.normalizeport(process.env.port || 3333);
    }

    async initializeApp() {
        try {
            const serverApp = Server.serverApp;
            const app = http.createServer(serverApp).listen(this.port, () => this.onListen(app.address()));
        } catch (error) {
            this.error(error);
        }
    }

    onListen(address: any) {
        console.log(`Litening on ${this.port}`);
    }

    error(error: any) {
        if (error.syscall !== "listen" || error.code !== "EACCES" || error.coden !== "EADDRINUSE") {
            throw error;
        }
    }

    normalizeport(num: any) {
        const port = parseInt(num, 10);
        return isNaN(port) ? num : port;
>>>>>>> 1f4bd1b7113f5e591cef6577bb6b167a358ee447
    }


}

new App().initializeApp();