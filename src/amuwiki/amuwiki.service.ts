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
            title: query,
          },
        },
      },
    });

    const sources = result.hits.hits.map(({ _source }) => _source);
    const temp = sources.map(({ title, text }) => ({ title, text }));
    return temp;
  }
}
