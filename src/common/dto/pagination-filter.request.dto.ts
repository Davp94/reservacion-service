import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Length, Max, Min } from "class-validator";
import { OrderEnum } from "src/constant/order.enum";

export class PaginationFilterRequestDto {

  @ApiProperty()
  @IsOptional()
  @Min(1)
  @IsNumber({}, {message: 'Numero no valido'})
  page?: number = 1;

  @ApiProperty()
  @IsOptional()
  @Min(1)
  @Max(100)
  @IsNumber()
  take?: number = 10;

  @ApiProperty()
  @IsOptional()
  @IsEnum(OrderEnum)
  order: OrderEnum;

  @ApiProperty()
  @IsOptional()
  @IsString()
  sortBy: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  filter: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  filterBy: string;

}
