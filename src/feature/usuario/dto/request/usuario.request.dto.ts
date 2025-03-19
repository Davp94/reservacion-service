import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, IsString, Length, Matches } from "class-validator";
import { Usuario } from "src/entity/usuario.entity";
import { IsNull } from "typeorm";

export class UsuarioRequestDto{

    @ApiProperty()
    @IsNotEmpty({message: 'No debe estar vacio'})
    @IsString({message: 'DEbe ser una cadena de textp'})
    @Length(20, 50, {message: 'Debe tener una longitud entre {min} y {max} caracteres'})
    nombres: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Length(50)
    apellidos: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Length(10)
    username: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        {
            message: 'Password must be at least 8 characters long and include uppercase, lowercase, number and special character',
        }
    )
    password: string;

    @ApiProperty({description: "dsadasdsadasd"})
    @IsNotEmpty()
    @IsEmail()
    correo: string;

    @ApiProperty()
    @IsNumber()
    estado: number;

    public static buildToEntity(usuarioRequestDto: UsuarioRequestDto) {
        const usuario: Usuario = new Usuario();
        usuario.nombres = usuarioRequestDto.nombres;
        usuario.apellidos = usuarioRequestDto.apellidos;
        usuario.correo = usuarioRequestDto.correo;
        usuario.password = usuarioRequestDto.password;
        usuario.estado = usuarioRequestDto.estado;
        usuario.username = usuarioRequestDto.username;
        return usuario;
    }
}