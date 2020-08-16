import 'reflect-metadata';
import { Container } from 'inversify';
import { CategoryService, PetService, UserService, TokenService } from '@services';

import { CategoryController, PetController, PingController, UserController } from '@controllers';

import { UserMiddleware, PetMiddleware } from '@middlewares';

import { JwtHelper } from '@helpers';

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