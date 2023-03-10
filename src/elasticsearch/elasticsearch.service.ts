import { Injectable } from '@nestjs/common';
import { spawn } from 'child_process';

@Injectable()
export class ElasticsearchService {
  private readonly monstacheProcess;

  constructor() {
    const configPath = `${__dirname}/monstache.json`;
    this.monstacheProcess = spawn('monstache', ['-f', configPath]);

    this.monstacheProcess.stdout.on('data', (data) => {
      console.log(data.toString());
    });

    this.monstacheProcess.stderr.on('data', (data) => {
      console.error(data.toString());
    });

    this.monstacheProcess.on('close', (code) => {
      console.log(`monstache process exited with code ${code}`);
    });
  }
}
