import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class AmuwikiService {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  async search(query: string): Promise<any> {
    const result = await this.elasticsearchService.search({
      index: 'nest.amuwikis',
      body: {
        size: 50,
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
    const temp = filteredHits.map((hit) => ({
      id: hit._id,
      title: hit._source.title,
    }));

    return temp;
  }

  async findMyPosts(email: string): Promise<any> {
    const result = await this.elasticsearchService.search({
      index: 'nest.amuwikis',
      body: {
        size: 50,
        query: {
          match: {
            contributors: {
              query: email,
              operator: 'AND',
            },
          },
        },
      },
      request_cache: true,
    });

    const filteredHits = this.filterResults(result.hits.hits);
    const temp = filteredHits.map((hit) => ({
      id: hit._id,
      title: hit._source.title,
      text: hit._source.text,
    }));
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
