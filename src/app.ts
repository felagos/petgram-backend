import 'reflect-metadata';

import express, { Application } from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import cors from 'cors';

import { MongoDB } from '@mongo';
import { container } from './container';
import { PingRoutes, AuthRoutes, CategoryRouter, PetRouter, FavoriteRouter } from '@routes';

class App {

    private _app: Application;
    private pingRoutes = container.resolve<PingRoutes>(PingRoutes);
    private authRoures = container.resolve<AuthRoutes>(AuthRoutes);
    private categoryRouter = container.resolve<CategoryRouter>(CategoryRouter);
    private petRouter = container.resolve<PetRouter>(PetRouter);
    private favoriteRouter = container.resolve<FavoriteRouter>(FavoriteRouter);

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
        this._app.use("/ping", this.pingRoutes.router);
        this._app.use("/auth", this.authRoures.router);
        this._app.use("/categorias", this.categoryRouter.router);
        this._app.use("/mascotas", this.petRouter.router);
        this._app.use("/favorite", this.favoriteRouter.router);
    }

    private initMongo() {
        MongoDB.connect();
    }

    public get app(): Application {
        return this._app;
    }

}

export default new App().app;