import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Empresa } from 'src/entity/empresa.entity';
import { Usuario } from 'src/entity/usuario.entity';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';
@Injectable()
export class EmpresaFactoryService {
  constructor(
    @InjectRepository(Empresa) private empresaRepository: Repository<Empresa>,
    @InjectRepository(Usuario) private usuarioRepository: Repository<Usuario>,
  ) {}

  async createEmpresas(cantidad: number): Promise<Empresa[]> {
    if ((await this.empresaRepository.find()).length === 0) {
      const usuarios = await this.usuarioRepository.find();
      const empresas = [];
      for (let i = 0; i < cantidad; i++) {
        empresas.push(await this.createEmpresa(usuarios));
      }
      return empresas;
    }
  }

  async createEmpresa(usuarios: Usuario[]): Promise<Empresa> {
    const firstName = faker.person.firstName() + ' ' + faker.person.firstName();
    const lastName = faker.person.lastName() + ' ' + faker.person.lastName();
    const empresa: Empresa = new Empresa();
    empresa.id = (await this.empresaRepository.count()) + 1;
    empresa.logo = 'logoempresa.png';
    empresa.nombre = faker.company.name();
    (empresa.codigo_registro = faker.string.alphanumeric(8).toUpperCase()),
      (empresa.razon_social = faker.company.buzzPhrase()),
      (empresa.nit = faker.string.numeric(10)),
      (empresa.estado = faker.helpers.arrayElement([0, 1])),
      (empresa.usuario = usuarios[Math.floor(Math.random() * usuarios.length)]);

    return this.empresaRepository.save(empresa);
  }
}
