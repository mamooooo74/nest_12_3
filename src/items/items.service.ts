import { Injectable, NotFoundException } from '@nestjs/common';
import { ItemStatus } from './item-status.enum';
import { CreateItemDto } from './dto/create-item.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Item } from '@prisma/client';

@Injectable()
export class ItemsService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<Item[]> {
    return await this.prismaService.item.findMany();
  }

  async findById(id: number): Promise<Item> {
    const item = await this.prismaService.item.findUnique({
      where: {
        id,
      },
    });
    if (!item) {
      throw new NotFoundException();
    }
    return item;
  }

  async create(createItemDto: CreateItemDto): Promise<Item> {
    const item = this.prismaService.item.create({
      data: {
        ...createItemDto,
        status: ItemStatus.ON_SALE,
      },
    });
    return item;
  }

  async updateStatus(id: number): Promise<Item> {
    const item = await this.prismaService.item.update({
      where: {
        id,
      },
      data: {
        status: ItemStatus.SOLD_OUT,
      },
    });
    if (!item) {
      return;
    }
    return item;
  }

  async delete(id: number): Promise<void> {
    try {
      await this.prismaService.item.delete({
        where: {
          id,
        },
      });
    } catch {
      throw new NotFoundException();
    }
    return;
  }
}
