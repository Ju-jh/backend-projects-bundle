import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '../elasticsearch/elasticsearch.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './product.schema';

@Injectable()
export class ProductService {
  constructor(
    private readonly elasticsearchService: ElasticsearchService,
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async createProduct(product: Product) {
    const createdProduct = new this.productModel(product);
    const result = await createdProduct.save();

    await this.elasticsearchService.index({
      index: 'products',
      body: {
        name: result.name,
        description: result.description,
        price: result.price,
      },
    });

    return result;
  }

  async getProducts() {
    const result = await this.productModel.find().exec();
    return result;
  }

  async getProductById(id: string) {
    const result = await this.productModel.findById(id).exec();
    return result;
  }

  async updateProduct(id: string, product: Product) {
    const updatedProduct = await this.productModel.findByIdAndUpdate(
      id,
      product,
      { new: true },
    );

    await this.elasticsearchService.update({
      index: 'products',
      id: updatedProduct.id,
      body: {
        doc: {
          name: updatedProduct.name,
          description: updatedProduct.description,
          price: updatedProduct.price,
        },
      },
    });

    return updatedProduct;
  }

  async deleteProduct(id: string) {
    const deletedProduct = await this.productModel.findByIdAndRemove(id);

    await this.elasticsearchService.delete({
      index: 'products',
      id: deletedProduct.id,
    });

    return deletedProduct;
  }

  async searchProducts(query: string) {
    const result = await this.elasticsearchService.search({
      index: 'products',
      body: {
        query: {
          multi_match: {
            query,
            fields: ['name', 'description'],
          },
        },
      },
    });

    return result.map((hit) => hit._source);
  }
}
