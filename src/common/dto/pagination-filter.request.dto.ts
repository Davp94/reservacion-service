import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Length, Max, Min } from "class-validator";
import { OrderEnum } from "src/constant/order.enum";

export class PaginationFilterRequestDto {

  @ApiProperty()
  @IsOptional()
  @Min(1)
  @IsNumber(null,{ message: 'Debe ser un numero' })
  page?: number = 1;

  @ApiProperty()
  @IsOptional()
  @Min(1)
  @Max(100)
  @IsNumber(null,{ message: 'Debe ser un numero' })
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
