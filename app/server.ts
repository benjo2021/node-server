import express, { NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import path from "path";
import http from "http";
import Routes from "./router";
import {Config} from "./config";

class Server {
  public serverApp: express.Application;
  private appRouter: Routes;

  constructor() {
    this.serverApp = express();
    this.appRouter = new Routes(this.serverApp);
  }

  public config(serverApp: express.Application) {
    serverApp.use(bodyParser.json({ limit: "50mb" }));
    serverApp.use(
      bodyParser.urlencoded({
        extended: true,
        limit: "50mb",
        parameterLimit: 100000000
      })
    );
    serverApp.use((req: Request, res: Response, next: NextFunction) => {
      res.header("Access-Control-Allow-Origin:", "*");
      res.header(
        "Access-Control-Allow-Headers:",
        "Origin, X-Requested-Widrh, Content-Type,Accept, Authorization"
      );
      res.header("Access-Control-Allow-Credentials:", "true");

      //intercept OPTIONS Method
      if (req.method == "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE,PUT");
        res.send(200);
      } else {

      }
    });
  }

  public routes(serverApp:express.Application,routerLink:express.Router){
    serverApp.use(( req:Request, res:Response, next : NextFunction)=>{
            if(!serverApp.get("mongoConnection")){
                const conString =  Config.MONGO_CON_URL;
            } else{

            }
    }) ;
  }


  /*  // API file for interacting with MongoDB
    const api = Routes;

    // Parsers
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    // Angular DIST output folder
    app.use(express.static(path.join(__dirname, "dist")));

    // API location
    app.use("/api", api);

    // Send all other requests to the Angular app
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist/index.html"));
    });

    //Set Port
    const port = process.env.PORT || "3000";
    app.set("port", port);

    const server = http.createServer(app);

    server.listen(port, () => console.log(`Running on localhost:${port}`)); */
}

export default new Server();
