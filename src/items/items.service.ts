import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ItemStatus } from './item-status.enum';
import { CreateItemDto } from './dto/create-item.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Item, User } from '@prisma/client';

@Injectable()
export class ItemsService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<Item[]> {
    return await this.prismaService.item.findMany({
      include: {
        user: true,
      },
    });
  }

  async findById(id: number) {
    const item = await this.prismaService.item.findUnique({
      where: {
        id,
      },
      select: {
        name: true,
        price: true,
        description: true,
        status: true,
        userId: true,
        user: {
          select: {
            name: true,
          },
        },
      },
    });
    if (!item) {
      throw new NotFoundException();
    }
    return item;
  }

  async create(createItemDto: CreateItemDto, user: User): Promise<Item> {
    const item = this.prismaService.item.create({
      data: {
        userId: user.id,
        ...createItemDto,
        status: ItemStatus.ON_SALE,
      },
    });
    return item;
  }

  async updateStatus(id: number, user: User): Promise<Item> {
    if ((await this.findById(id)).userId === user.id) {
      throw new BadRequestException('自身の商品を購入することはできません。');
    }
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

  async delete(id: number, user: User) {
    if ((await this.findById(id)).userId !== user.id) {
      throw new BadRequestException('他人の商品は削除できません。');
    }
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
