import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private repo: Repository<Product>,
  ) {}

  async all() {
    return this.repo.find();
  }
  async get(id: number) {
    const found = await this.repo.findOne({ id });
    if (!found) {
      throw new NotFoundException('Product not found');
    }
    return found;
  }
  async store(data: any) {
    return this.repo.save(data);
  }
  async update(id: number, data: any) {
    const found = await this.get(id);
    await this.repo.merge(found, data).save();
    return found;
  }
  async destroy(id: number) {
    return this.repo.delete({ id });
  }
}
