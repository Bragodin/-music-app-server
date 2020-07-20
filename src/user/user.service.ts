import { BadRequestException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import * as _ from 'lodash';
import { IUser } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { IUserToken } from '../token/interfaces/user-token.interface';
import { IMusic } from '../music/interfaces/music.interfaces';
import * as mongoose from 'mongoose';

@Injectable()
export class UserService {

  private readonly saltRounds = 10;

  constructor(@InjectModel('User') private readonly userModel: Model<IUser>, @InjectModel('Music') private readonly musicModel: Model<IMusic>){}

  async create(createUserDto: CreateUserDto, roles: string[]): Promise<IUser> {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(createUserDto.password, salt);
    const createdUser = new this.userModel(_.assignIn(createUserDto, { password: hash, roles }));
    return await createdUser.save();
  }

  async find(id: string): Promise<IUser> {
    return await this.userModel.findById(id).exec();
  }

  async getUsers(): Promise<any> {
    return await this.userModel.find().exec();
  }

  async findByEmail(email: string): Promise<IUser> {
    return await this.userModel.findOne({ email }).exec();
  }

  async update(id: string, payload: Partial<IUser>) {
    return this.userModel.updateOne({_id: id}, payload);
  }

  async getUsersNameById(id: string){
    return await this.userModel.findById(id).select('name');
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.saltRounds);
    return await bcrypt.hash(password, salt);
  }

  async addMusicToUser(userId, musicId): Promise<string> {
    const music = await this.musicModel.findById(musicId);
    const user: any = await this.userModel.findById(userId);

    if(music) {
      const isMusicNoRepeat = user.myMusic.find(elem => elem.name === musicId);
      const thisMusicModel = this.musicModel;
      if (!isMusicNoRepeat) {
        return this.userModel.updateOne({ _id: userId }, { $addToSet: { myMusic: { name: musicId } } }, function(err, data){
          if(err) {
            throw new BadRequestException();
          } else {
            return  thisMusicModel.findByIdAndUpdate(musicId, { $inc : { likes: 1 }}).exec();
          }
        });
      } else {
        console.log('Item already exists');
        throw new BadRequestException();
      }
    }
  }

  async getMyMusic(id) {
    const user: any = await this.userModel.findById(id);
    const myMusic = await user.myMusic.map(el => el.name);
    return this.musicModel.find({ _id: { $in:  myMusic } });
  }

  async removeMusicFromUser(userId, musicId) {
    const user: any = await this.userModel.findById(userId);
    const thisMusicModel = this.musicModel;

    return this.userModel.findByIdAndUpdate(
      userId, { $pull: { "myMusic": { name: musicId } } }, {  upsert: true },
      function(err, node) {
        if (err) {
          throw new BadRequestException();
        } else {
          return  thisMusicModel.findByIdAndUpdate(musicId, { $inc : { likes: -1 }}).exec();
        }
      }
    );
  }
}


