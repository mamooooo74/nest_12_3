import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ItemsService } from './items.service';

import { CreateItemDto } from './dto/create-item.dto';
import { Item } from '@prisma/client';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}
  @Get()
  async findAll(): Promise<Item[]> {
    return await this.itemsService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<Item> {
    return await this.itemsService.findById(id);
  }

  @Post()
  async create(@Body() createItemDto: CreateItemDto): Promise<Item> {
    return await this.itemsService.create(createItemDto);
  }

  @Patch(':id')
  updateStatus(@Param('id') id: number): Promise<Item> {
    return this.itemsService.updateStatus(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return await this.itemsService.delete(id);
  }
}
