import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";
import { IMusic } from './interfaces/music.interfaces';

@Injectable()
export class MusicService {
  constructor(@InjectModel('Music') private readonly musicModel: Model<IMusic>){}

  async getMusic() {
    return await this.musicModel.find().exec();
  }

  async postMusic(music) {
    return await this.musicModel.find().exec();
  }

  async getMusicByUser(id, token) {
    return await this.musicModel.find().exec();
  }

}
