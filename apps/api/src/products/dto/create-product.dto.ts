import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name!: string;

  @IsString()
  price!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNumber()
  stock!: number;
}