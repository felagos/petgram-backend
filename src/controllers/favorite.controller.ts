import { injectable, inject } from "inversify";
import { HttpStatus } from "@enums";
import { ResponseData } from "@models";
import { Request, Response } from "express";
import { FavoriteService, UserService } from "@services";
import { JwtHelper } from "@helpers";

@injectable()
export class FavoriteController {

    constructor(@inject(FavoriteService) private favoriteService: FavoriteService,
        @inject(JwtHelper) private jwtHelper: JwtHelper,
        @inject(UserService) private userService: UserService) { }

    public addFavorite = async (req: Request, res: Response) => {
        const { authorization = "" } = req.headers;
        const { petId } = req.body;
        const payload = this.jwtHelper.decode(authorization);
        const user = await this.userService.getByEmail(payload.user.email);

        const response = await this.favoriteService.addFavorite(user._id, petId);

        return res.status(HttpStatus.OK).json(new ResponseData(response));
    }

    public deleteFavorite = async (req: Request, res: Response) => {
        const { authorization = "" } = req.headers;
        const { petId } = req.params;
        const payload = this.jwtHelper.decode(authorization);
        const user = await this.userService.getByEmail(payload.user.email);

        const response = await this.favoriteService.addFavorite(user._id, petId);

        return res.status(HttpStatus.OK).json(new ResponseData(response));
    }

}