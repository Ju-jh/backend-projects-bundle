import { Injectable } from '@nestjs/common';
import { ElasticsearchService as NestElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class ElasticsearchService {
  constructor(
    private readonly elasticsearchService: NestElasticsearchService,
  ) {}

  async index(params: { index: string; body: object }) {
    return await this.elasticsearchService.index(params);
  }

  async update(params: { index: string; id: string; body: object }) {
    return await this.elasticsearchService.update(params);
  }

  async delete(params: { index: string; id: string }) {
    return await this.elasticsearchService.delete(params);
  }

  async search(params: { index: string; body: object }) {
    const body = await this.elasticsearchService.search(params);
    return body.hits.hits;
  }
}
