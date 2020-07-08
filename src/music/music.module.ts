import { Module } from '@nestjs/common';
import { MusicService } from './music.service';
import { MusicController } from './music.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MusicSchema } from './schemas/music.schema';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Music', schema: MusicSchema}]),
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  providers: [MusicService],
  controllers: [MusicController],
  exports: [ MusicService ]
})

export class MusicModule {}
