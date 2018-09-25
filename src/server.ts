import express, { NextFunction, Response, Request } from "express";
import bodyParser from "body-parser";
import Routes from "./router";
import { Config } from "./config";
import { connect, Mongoose } from "mongoose";

class Server {
<<<<<<< HEAD
  public serverApp : express.Application;
  appRouter : Routes;

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
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers",        "Origin, X-Requested-Width, Content-Type,Accept, Authorization" );
      res.header("Access-Control-Allow-Credentials:", "true");

      //intercept OPTIONS Method
      if (req.method == "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE,PUT");
        res.send(200);
      } else {
        next();
      }
    });
  }

  public routes(serverApp: express.Application, routerlink: express.Router) {
    serverApp.use(async (req: Request, res: Response, next: NextFunction) => {
      if (!serverApp.get("mongoConnection")) {
        const conString = Config.MONGO_CON_URL || "http://localhost:3333/";
        const  conn = await connect(conString);
        serverApp.set("mongoConnection",conn);
      } 
        next();
      
    });
    serverApp.use("/api/",routerlink);
  }

  
=======
    public serverApp: express.Application;
    appRouter: Routes;

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
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-Width, Content-Type, Accept, Authorization");
            res.header("Access-Control-Allow-Credentials", "true");

            // Intercept OPTIONS Method
            if (req.method == "OPTIONS") {
                res.header("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE,PUT");
                res.send(200);
            } else {
                next();
            }
        });
    }

    public routes(serverApp: express.Application, routerlink: express.Router) {
        serverApp.use(async (req: Request, res: Response, next: NextFunction) => {
            if (!serverApp.get("mongoConnection")) {
                const conString = Config.MONGO_CON_URL || "http://localhost:3333/";
                const conn = await connect(conString);
                serverApp.set("mongoConnection", conn);
            }
            next();
        });

        serverApp.use("/api/",routerlink);
    }
>>>>>>> 1f4bd1b7113f5e591cef6577bb6b167a358ee447
}

export default new Server();