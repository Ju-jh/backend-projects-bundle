import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SearchAmuwikiDto } from './dto/searchAmuwiki.dto';
import { Amuwiki } from './schema/amuwiki.schema';

@Injectable()
export class AmuwikiService {
  constructor(
    private readonly elasticsearchService: ElasticsearchService,
    @InjectModel('Amuwiki') private AmuwikiModel: Model<Amuwiki>,
  ) {}

  async search(query: string) {
    const body = await this.elasticsearchService.search({
      index: 'Amuwikis',
      body: {
        query: {
          match: {
            query: query,
          },
        },
      },
    });
    console.log(body);

    const hits = body.hits.hits;
    console.log(hits);

    const amuwikis = hits.map((hit) => {
      return {
        id: hit._id,
        namespace: hit._source.namespace,
        title: hit.title,
        text: hit.text,
      };
    });

    return Amuwiki;
  }
}
