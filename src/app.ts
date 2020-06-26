import express, { Application } from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import cors from 'cors';

import { MongoDB } from '@mongo/connection';
import PingRoutes from '@routes/ping.routes';
import AuthRoutes from '@routes/auth.routes';
import CategoriaRoutes from '@routes/categoria.routes';
import MascotaRoutes from '@routes/mascota.routes';

class App {

    private _app: Application;

    constructor() {
        this._app = express();
        this.initApp();
        this.initRoutes();
        this.initMongo();
    }

    private initApp() {
        this._app.use(bodyParser.json());
        this._app.use(bodyParser.urlencoded({ extended: false }));
        this._app.use(helmet());
        this._app.use(cors());
    }
    
    private initRoutes() {
        this._app.use("/ping", PingRoutes.router);
        this._app.use("/auth", AuthRoutes.router);
        this._app.use("/categorias", CategoriaRoutes.router);
        this._app.use("/mascotas", MascotaRoutes.router);
    }

    private initMongo() {
        MongoDB.connect();
    }

    public get app(): Application {
        return this._app;
    }

}

export default new App().app;