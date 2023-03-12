// import { Module } from '@nestjs/common';
// import { ElasticsearchModule } from '@nestjs/elasticsearch';
// import { MongooseModule } from '@nestjs/mongoose';
// import { ElasticsearchService } from 'src/elasticsearch/elasticsearch.service';
// import { AmuwikiController } from './amuwiki.controller';
// import { AmuwikiService } from './amuwiki.service';
// import { AmuwikiSchema } from './schema/amuwiki.schema';

// @Module({
//   imports: [
//     ElasticsearchModule.registerAsync({
//       useFactory: () => ({
//         node: process.env.ELASTICSEARCH_NODE,
//         auth: {
//           username: process.env.ELASTICSEARCH_USERNAME,
//           password: process.env.ELASTICSEARCH_PASSWORD,
//         },
//       }),
//     }),
//     MongooseModule.forFeature([{ name: 'Amuwiki', schema: AmuwikiSchema }]),
//   ],
//   controllers: [AmuwikiController],
//   providers: [AmuwikiService, ElasticsearchService],
// })
// export class AmuwikiModule {}
