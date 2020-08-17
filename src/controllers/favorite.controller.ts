import { injectable, inject } from "inversify";
import { HttpStatus } from "@enums";
import { ResponseData } from "@models";
import { Request, Response } from "express";
import { FavoriteService } from "@services";

@injectable()
export class FavoriteController {

    @inject(FavoriteService) private favoriteService: FavoriteService

    public addFavorite = async (req: Request, res: Response) => {
        const { authorization = "" } = req.headers;
        const { pet } = req.body;

        const response = await this.favoriteService.addFavorite(authorization, pet);

        return res.status(HttpStatus.OK).json(new ResponseData(response));
    }

    public deleteFavorite = async (req: Request, res: Response) => {
        const { authorization = "" } = req.headers;
        const { petId } = req.params;

        const response = await this.favoriteService.deleteFavorite(authorization, petId);

        return res.status(HttpStatus.OK).json(new ResponseData(response));
    }

    public getAll = async (req: Request, res: Response) => {
        const { authorization = "" } = req.headers;

        const response = await this.favoriteService.getAllFavorites(authorization);

        return res.status(HttpStatus.OK).json(new ResponseData(response));
    }

}