import 'reflect-metadata';
import { Container } from 'inversify';
import { CategoriaService } from '@services/categoria.service';
import { MascotaService } from '@services/mascota.service';
import { UsuarioService } from '@services/usuario.service';
import { CategoriaController } from '@controllers/categoria.controller';
import { MascotaController } from '@controllers/mascota.controller';
import { PingController } from '@controllers/ping.controller';
import { UsuarioController } from '@controllers/usuario.controller';

const container = new Container();

//servicios
container.bind<CategoriaService>(CategoriaService).to(CategoriaService);
container.bind<MascotaService>(MascotaService).to(MascotaService);
container.bind<UsuarioService>(UsuarioService).to(UsuarioService);

//controladores
container.bind<CategoriaController>(CategoriaController).to(CategoriaController);
container.bind<MascotaController>(MascotaController).to(MascotaController);
container.bind<PingController>(PingController).to(PingController);
container.bind<UsuarioController>(UsuarioController).to(UsuarioController);


export { container };