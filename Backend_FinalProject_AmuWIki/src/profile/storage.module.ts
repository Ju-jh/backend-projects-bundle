import { Global, Module } from '@nestjs/common';
import { Storage } from '@google-cloud/storage';

@Global()
@Module({
  providers: [
    {
      provide: Storage,
      useValue: new Storage({
        projectId: 'my-project-amu',
        keyFilename: './my-project-amu-b74433c069fd.json',
      }),
    },
  ],
  exports: [Storage],
})
export class StorageModule {}
