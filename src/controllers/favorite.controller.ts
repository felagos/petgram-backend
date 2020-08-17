import { injectable, inject } from "inversify";
import { HttpStatus } from "@enums";
import { ResponseData } from "@models";
import { Request, Response, response } from "express";
import { FavoriteService, UserService } from "@services";
import { JwtHelper } from "@helpers";

@injectable()
export class FavoriteController {

    constructor(@inject(FavoriteService) private favoriteService: FavoriteService) { }

    public addFavorite = async (req: Request, res: Response) => {
        const { authorization = "" } = req.headers;
        const { petId } = req.body;

        const response = await this.favoriteService.addFavorite(authorization, petId);

        return res.status(HttpStatus.OK).json(new ResponseData(response));
    }

    public deleteFavorite = async (req: Request, res: Response) => {
        const { authorization = "" } = req.headers;
        const { petId } = req.params;

        const response = await this.favoriteService.addFavorite(authorization, petId);

        return res.status(HttpStatus.OK).json(new ResponseData(response));
    }

    public getAll = async (req: Request, res: Response) => {
        const { authorization = "" } = req.headers;

        const response = await this.favoriteService.getAllFavorities(authorization);

        return res.status(HttpStatus.OK).json(new ResponseData(response));
    }

}