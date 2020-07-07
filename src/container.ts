import 'reflect-metadata';
import { Container } from 'inversify';
import { CategoriaService } from '@services/categoria.service';
import { MascotaService } from '@services/mascota.service';
import { UsuarioService } from '@services/usuario.service';
import { CategoriaController } from '@controllers/categoria.controller';
import { MascotaController } from '@controllers/mascota.controller';
import { PingController } from '@controllers/ping.controller';
import { UsuarioController } from '@controllers/usuario.controller';
import { TokenService } from '@services/token.service';
import { UsuarioMiddleware } from '@middlewares/usuario.middlware';
import { MascotaMiddleware } from '@middlewares/mascota.middleare';
import { JwtHelper } from '@helpers/jwt.helper';
import { TokenMiddleware } from '@middlewares/token.middleware';

const container = new Container();

//servicios
container.bind<CategoriaService>(CategoriaService).to(CategoriaService);
container.bind<MascotaService>(MascotaService).to(MascotaService);
container.bind<UsuarioService>(UsuarioService).to(UsuarioService);
container.bind<TokenService>(TokenService).to(TokenService);

//controladores
container.bind<CategoriaController>(CategoriaController).to(CategoriaController);
container.bind<MascotaController>(MascotaController).to(MascotaController);
container.bind<PingController>(PingController).to(PingController);
container.bind<UsuarioController>(UsuarioController).to(UsuarioController);

//middleware
container.bind<UsuarioMiddleware>(UsuarioMiddleware).to(UsuarioMiddleware);
container.bind<MascotaMiddleware>(MascotaMiddleware).to(MascotaMiddleware);
container.bind<TokenMiddleware>(TokenMiddleware).to(TokenMiddleware);

//helpers
container.bind<JwtHelper>(JwtHelper).to(JwtHelper);

export { container };