import 'reflect-metadata';
import { Container } from 'inversify';
import { CategoryService, PetService, UserService, TokenService, FavoriteService } from '@services';
import { CategoryController, PetController, PingController, UserController, FavoriteController } from '@controllers';
import { AuthMiddleware, PetMiddleware } from '@middlewares';
import { JwtHelper } from '@helpers';
import { CategoryRepository, FavoriteRepository, PetRepository, TokenRepository, UserRepository } from '@repository';

const container = new Container();

//servicios
container.bind<CategoryService>(CategoryService).to(CategoryService);
container.bind<PetService>(PetService).to(PetService);
container.bind<UserService>(UserService).to(UserService);
container.bind<TokenService>(TokenService).to(TokenService);
container.bind<FavoriteService>(FavoriteService).to(FavoriteService);

//controladores
container.bind<CategoryController>(CategoryController).to(CategoryController);
container.bind<PetController>(PetController).to(PetController);
container.bind<PingController>(PingController).to(PingController);
container.bind<UserController>(UserController).to(UserController);
container.bind<FavoriteController>(FavoriteController).to(FavoriteController);

//middleware
container.bind<AuthMiddleware>(AuthMiddleware).to(AuthMiddleware);
container.bind<PetMiddleware>(PetMiddleware).to(PetMiddleware);

//helpers
container.bind<JwtHelper>(JwtHelper).to(JwtHelper);

//repository
container.bind<CategoryRepository>(CategoryRepository).to(CategoryRepository);
container.bind<FavoriteRepository>(FavoriteRepository).to(FavoriteRepository);
container.bind<PetRepository>(PetRepository).to(PetRepository);
container.bind<TokenRepository>(TokenRepository).to(TokenRepository);
container.bind<UserRepository>(UserRepository).to(UserRepository);

export { container };