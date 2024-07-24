import express from "express";
import invoices from "./routers/invoices.js";
import env from "./config/env.js";
import cors from 'cors';
import { secureRequest } from './middlewares/secureResponse.js';
import { sendReponse } from "./helpers/response.js";

class Server {
  app = express();
  server_port = env.SERVER_PORT;
  constructor() {
    this.init();
    this.loggers();
    this.routers();
  }

  init() {
    this.app.use(express.json({ limit: "5mb" }));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors(this.corsOptionsDelegate));
    this.app.use(secureRequest)
  }
  corsOptionsDelegate(req, callback) {
    let corsOptions;
    const whiteList = env.WHITELIST;
    if (whiteList.indexOf(req.header("Origin")) !== -1) {
      corsOptions = { origin: true };
    } else {
      corsOptions = { origin: false };
    }
    callback(null, corsOptions);
  }
  loggers() { }

  routers() {
    this.app.use("/api/v1/invoices", invoices);
    this.app.use("/uploads", express.static(env.FILE_UPLOAD_PATH));
    this.app.use('*', (req, res) => { sendReponse(res) })
  }
}

export default Server;
