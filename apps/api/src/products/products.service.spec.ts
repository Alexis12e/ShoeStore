
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { NotFoundException } from '@nestjs/common';

const { whereMock, firstMock } = vi.hoisted(() => ({
  whereMock: vi.fn(),
  firstMock: vi.fn(),
}));

vi.mock('../prisma/db.js', () => ({
  db: {
    orm: {
      public: {
        Product: {
          where: whereMock,
        },
      },
    },
  },
}));

import { ProductsService } from './products.service.js';

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(() => {
    vi.clearAllMocks();
    whereMock.mockReturnValue({ first: firstMock });
    service = new ProductsService();
  });

  it('debe devolver un producto existente', async () => {
    const product = {
      id: 1,
      name: 'Tenis Nike Air',
      price: '1499',
      description: 'Tenis deportivos',
      stock: 10,
    };

    firstMock.mockResolvedValue(product);

    await expect(service.findOne(1)).resolves.toEqual(product);
    expect(whereMock).toHaveBeenCalledWith({ id: 1 });
  });

  it('debe lanzar 404 si el producto no existe', async () => {
    firstMock.mockResolvedValue(null);

    await expect(service.findOne(999))
      .rejects.toBeInstanceOf(NotFoundException);
  });

  it('debe propagar errores inesperados de la consulta', async () => {
  const error = new Error('Error de conexión');

  firstMock.mockRejectedValue(error);

  await expect(service.findOne(1)).rejects.toThrow(
    'Error de conexión',
  );
});

});