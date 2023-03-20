import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Amuwiki } from './schema/amuwiki.schema';

@Injectable()
export class AmuwikiService {
  constructor(
    private readonly elasticsearchService: ElasticsearchService,
    @InjectModel('Amuwiki') private AmuwikiModel: Model<Amuwiki>,
  ) {}

  async search(query: string): Promise<any> {
    const result = await this.elasticsearchService.search({
      index: 'nest.amuwikis',
      body: {
        query: {
          match: {
            title: {
              query: query,
              operator: 'AND',
            },
          },
        },
      },
      request_cache: true,
    });
    const filteredHits = this.filterResults(result.hits.hits);
    const sources = filteredHits.map(({ _source }) => _source);
    const temp = sources.map(({ title, text }) => ({ title, text }));
    return temp;
  }

  async findMyPosts(nickname: string): Promise<any> {
    const result = await this.elasticsearchService.search({
      index: 'nest.amuwikis',
      body: {
        query: {
          match: {
            contributors: {
              query: nickname,
            },
          },
        },
      },
      request_cache: true,
    });
    const sources = result.hits.hits.map(({ _source }) => _source);
    const temp = sources.map(({ title, text }) => ({ title, text }));
    return temp;
  }

  filterResults(hits) {
    return hits.filter((hit) => {
      const title = hit._source.title;
      const regex = /[\(\)\/]/;

      return !regex.test(title);
    });
  }
}
