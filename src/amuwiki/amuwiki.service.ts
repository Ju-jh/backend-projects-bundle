// import { Injectable } from '@nestjs/common';
// import { ElasticsearchService } from '@nestjs/elasticsearch';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { Amuwiki } from './schema/amuwiki.schema';

// @Injectable()
// export class AmuwikiService {
//   constructor(
//     private readonly elasticsearchService: ElasticsearchService,
//     @InjectModel('Amuwiki') private AmuwikiModel: Model<Amuwiki>,
//   ) {}

//   async search(query: string): Promise<any[]> {
//     const result = await this.elasticsearchService.search({
//       index: 'amuwikis', // Elasticsearch에서 MongoDB 데이터를 검색할 인덱스 이름
//       body: {
//         query: {
//           multi_match: {
//             query: 'search keyword',
//             fields: ['title', 'text'],
//           },
//         },
//       },
//     });
//     console.log('@@@@@@@@@@@@@@@', result);
//     console.log('###############', result.hits.hits);

//     return result.hits.hits;
//   }
// }
