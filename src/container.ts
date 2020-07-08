import 'reflect-metadata';
import { Container } from 'inversify';
import { CategoryService } from '@services/category.service';
import { PetService } from '@services/pet.service';
import { UserService } from '@services/user.service';
import { CategoryController } from '@controllers/category.controller';
import { PetController } from '@controllers/pet.controller';
import { PingController } from '@controllers/ping.controller';
import { UserController } from '@controllers/user.controller';
import { TokenService } from '@services/token.service';
import { UserMiddleware } from '@middlewares/user.middlware';
import { PetMiddleware } from '@middlewares/pet.middleare';
import { JwtHelper } from '@helpers/jwt.helper';

const container = new Container();

//servicios
container.bind<CategoryService>(CategoryService).to(CategoryService);
container.bind<PetService>(PetService).to(PetService);
container.bind<UserService>(UserService).to(UserService);
container.bind<TokenService>(TokenService).to(TokenService);

//controladores
container.bind<CategoryController>(CategoryController).to(CategoryController);
container.bind<PetController>(PetController).to(PetController);
container.bind<PingController>(PingController).to(PingController);
container.bind<UserController>(UserController).to(UserController);

//middleware
container.bind<UserMiddleware>(UserMiddleware).to(UserMiddleware);
container.bind<PetMiddleware>(PetMiddleware).to(PetMiddleware);

//helpers
container.bind<JwtHelper>(JwtHelper).to(JwtHelper);

export { container };