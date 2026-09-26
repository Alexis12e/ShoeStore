import { CreateProductDto } from './dto/create-product.dto.js';
import { Controller, Get, Post, Body } from '@nestjs/common';
import { ProductsService } from './products.service.js';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Post()
 create(@Body() body: CreateProductDto) {
    return this.productsService.create(body);
  }
}