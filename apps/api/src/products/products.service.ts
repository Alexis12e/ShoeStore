
import { CreateProductDto } from './dto/create-product.dto.js';
import { Injectable } from '@nestjs/common';
import { db } from '../prisma/db.js';
import type { Models } from '../prisma/contract.d.js';

@Injectable()
export class ProductsService {
  async findAll(): Promise<unknown[]> {
    return db.orm.public.Product.all();
  }

  async create(body: CreateProductDto): Promise<Models.public_Product> {
    return db.orm.public.Product.create({
     name: body.name,
  price: body.price,
  description: body.description,
  stock: body.stock,
    });
  }
}