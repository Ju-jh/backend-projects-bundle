// import { Controller, Get, Param } from '@nestjs/common';
// import { ElasticsearchService } from '@nestjs/elasticsearch';
// import { AmuwikiService } from './amuwiki.service';

// @Controller('amuwiki')
// export class AmuwikiController {
//   constructor(
//     private readonly elasticsearchService: ElasticsearchService,
//     private readonly amuwikiService: AmuwikiService,
//   ) {}

//   @Get('search/:query')
//   async search(@Param('query') query: string) {
//     const amuwikis = await this.amuwikiService.search(query);
//     return amuwikis;
//   }

//   @Get('search/es/:query')
//   async searchElasticsearch(@Param('query') query: string) {
//     const body = await this.elasticsearchService.search({
//       index: 'amuwikis',
//       body: {
//         query: {
//           multi_match: {
//             query: query,
//             fields: ['title^3', 'description'],
//           },
//         },
//       },
//     });
//     return body.hits.hits;
//   }
// }
