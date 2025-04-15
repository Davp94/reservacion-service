import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Empresa } from "src/entity/empresa.entity";

export class EmpresaRequestDto{

    @ApiProperty()
    @IsNumber()
    @Transform(({value})=> Number(value))
    id: number;
}