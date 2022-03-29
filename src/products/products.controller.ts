import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from './product.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly service: ProductsService) {}
  @Get()
  async all() {
    return this.service.all();
  }

  @Get(':id')
  async get(@Param('id') id: number) {
    return this.service.get(id);
  }

  @Post()
  async store(@Body() data: CreateProductDto) {
    return this.service.store(data);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() data: UpdateProductDto) {
    return this.service.update(id, data);
  }
  @Delete(':id')
  async destroy(@Param('id') id: number) {
    await this.service.destroy(id);
    return 'deleted';
  }
}
