import { injectable, inject } from "inversify";
import { HttpStatus } from "@enums";
import { ResponseData } from "@models";
import { Request, Response } from "express";
import { FavoriteService } from "@services";
import { BaseController } from "./base.controller";

@injectable()
export class FavoriteController extends BaseController {

    @inject(FavoriteService) private favoriteService: FavoriteService

    public addFavorite = async (req: Request, res: Response) => {
        const { authorization = "" } = req.headers;
        const { pet } = req.body;

        const response = await this.favoriteService.addOrCreateFavorite(authorization, pet);

        return this.responseOK(res, response);
    }

    public deleteFavorite = async (req: Request, res: Response) => {
        const { authorization = "" } = req.headers;
        const { petId } = req.params;

        const response = await this.favoriteService.deleteFavorite(authorization, petId);

        return this.responseOK(res, response);
    }

    public getAll = async (req: Request, res: Response) => {
        const { authorization = "" } = req.headers;

        const response = await this.favoriteService.getAllFavorites(authorization);

        return this.responseOK(res, response);
    }

}