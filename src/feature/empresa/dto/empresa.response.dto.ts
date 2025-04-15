import { IsNotEmpty, IsString } from "class-validator";
import { Empresa } from "src/entity/empresa.entity";

export class EmpresaResponseDto{

    id: number;
    nombre: string;
    razon_social: string;
    codigo_registro: string;
    nit: string;
    logo: string;
    usuarioId: number;

    public static buildFromEntity(empresa: Empresa) {
        const empresaResponseDto: EmpresaResponseDto = new EmpresaResponseDto();
        empresaResponseDto.id = empresa.id;
        empresaResponseDto.nombre = empresa.nombre;
        empresaResponseDto.razon_social = empresa.razon_social;
        empresaResponseDto.codigo_registro = empresa.codigo_registro;
        empresaResponseDto.nit = empresa.nit;
        empresaResponseDto.logo = empresa.logo;
        //empresaResponseDto.usuarioId = empresa.usuario.id;
        return empresaResponseDto;
    }
}