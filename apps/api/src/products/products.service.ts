import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';

import { db } from '../prisma/db.js';
import type { Models } from '../prisma/contract.d.js';

@Injectable()
export class ProductsService {
  async findAll(): Promise<unknown[]> {
    return db.orm.public.Product.all();
  }

  async findOne(id: number): Promise<Models.public_Product> {
    const product = await db.orm.public.Product
      .where({ id })
      .first();

    if (!product) {
      throw new NotFoundException('Producto no encontrado');
    }

    return product;
  }

  async create(body: CreateProductDto): Promise<Models.public_Product> {
    return db.orm.public.Product.create({
      name: body.name,
      price: body.price,
      description: body.description,
      stock: body.stock,
    });
  }

async update(
  id: number,
  body: UpdateProductDto,
): Promise<Models.public_Product> {
  const product = await db.orm.public.Product
    .where({ id })
    .update(body);

  if (!product) {
    throw new NotFoundException('Producto no encontrado');
  }

  return product;
}

async remove(id: number): Promise<Models.public_Product> {
  const product = await db.orm.public.Product
    .where({ id })
    .delete();

  if (!product) {
    throw new NotFoundException('Producto no encontrado');
  }

  return product;
}
}