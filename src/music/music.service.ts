import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";
import { IMusic } from './interfaces/music.interfaces';
import * as bcrypt from 'bcrypt';
import { CreateMusicDto } from './dto/create-music.dtp';
import * as _ from 'lodash';


@Injectable()
export class MusicService {
  constructor(@InjectModel('Music') private readonly musicModel: Model<IMusic>){}

  async getMusic() {
    return await this.musicModel.find().exec();
  }

  async postMusic(createMusicDto: CreateMusicDto) {
    const createdMusic = new this.musicModel(_.assignIn( createMusicDto, {}));
    return await createdMusic.save();
  }

  async getMusicByUser(id, token) {
    return await this.musicModel.find().exec();
  }

  async removeMusic(id) {
    return this.musicModel.deleteOne({ _id: id });
  }

  async changeMusicName(id, music) {
    return this.musicModel.updateOne({ _id: id }, { $set: music });
  }

}
