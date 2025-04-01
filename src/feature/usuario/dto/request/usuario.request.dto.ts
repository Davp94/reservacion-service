import { PipesConsumer } from "@nestjs/core/pipes";
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, IsString, Length, Matches } from "class-validator";
import { FileSizeValidationPipe } from "src/common/pipe/file-validation.pipe";
import { Usuario } from "src/entity/usuario.entity";

export class UsuarioRequestDto{

    @ApiProperty()
    @IsNotEmpty({message: 'No debe estar vacio'})
    @IsString({message: 'DEbe ser una cadena de textp'})
    @Length(10, 50, {message: 'Debe tener una longitud entre {min} y {max} caracteres'})
    nombres: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Length(20)
    apellidos: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Length(5,10)
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

    //TODO add validation pipe as anotation
    file: Express.Multer.File

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