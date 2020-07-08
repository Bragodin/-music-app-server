import { Injectable, UnauthorizedException, BadRequestException, MethodNotAllowedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { TokenService } from 'src/token/token.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { SignOptions } from 'jsonwebtoken';
import { CreateUserTokenDto } from 'src/token/dto/create-user-token.dto';
import { roleEnum } from 'src/user/enums/role.enum';
import { IUser } from 'src/user/interfaces/user.interface';
import { SignInDto } from './dto/signin.dto';
import { ConfigService } from '@nestjs/config';
import { MailService } from 'src/mail/mail.service';
import * as bcrypt from 'bcrypt';
import * as _ from 'lodash';
import * as moment from 'moment';
import { IReadableUser } from '../user/interfaces/readable-user.interface';
import { userSensitiveFieldsEnum } from 'src/user/enums/protected-fields.enum';
import { ITokenPayload } from './interfaces/token-payload.interface';
import { statusEnum } from '../user/enums/status.enum';
import { ChangePasswordDto } from './dto/change-password.dto';

@Injectable()
export class AuthService {
  private readonly clientAppUrl: string;

  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
    private readonly configService: ConfigService,
    private readonly mailService: MailService,
  ) {
    this.clientAppUrl = this.configService.get<string>('FE_APP_URL');
  }

  async signUp(createUserDto: CreateUserDto): Promise<boolean> {
    const user = await this.userService.create(createUserDto, [roleEnum.user]);
    await this.sendConfirmation(user);
    await user.save();

    return true;
  }

  async signIn({ email, password }: SignInDto): Promise<IReadableUser> {
    const user = await (await this.userService.findByEmail(email));

    if (user && (await bcrypt.compare(password, user.password))) {
      if (user.status !== statusEnum.active) {
        throw new MethodNotAllowedException();
      }

      const token = await this.signUser(user);

      const readableUser = user.toObject() as IReadableUser;
      readableUser.accessToken = token;

      return _.omit<any>(readableUser, Object.values(userSensitiveFieldsEnum)) as IReadableUser;
    }
    throw new BadRequestException('Invalid credentials');
  }

  async confirm(token: string): Promise<IUser> {
    const data = await this.verifyToken(token);
    const user = await this.userService.find(data._id);

    await this.tokenService.delete(data._id, token);

    if (
    user && user.status === statusEnum.pending) {
      user.status = statusEnum.active;
      return user.save();
    }
    throw new BadRequestException('Confirmation error');
  }

  async sendConfirmation(user: IUser) {
    const expiresIn = 60 * 60 * 24; // 24 hours

    const token = await this.signUser(user);
    const confirmLink = `${this.clientAppUrl}/auth/confirm?token=${token}`;

    await this.mailService.send({
      from: this.configService.get<string>('JS_CODE_MAIL'),
      to: user.email,
      subject: 'Verify User',
      text: `
                <h3>Hello ${user.email}!</h3>
                <p>Please use this <a href="${confirmLink}">link</a> to confirm your account.</p>
            `,
    });
  }

  async signUser(user: IUser, withStatusCheck = true): Promise<string> {
    if (withStatusCheck && (user.status !== statusEnum.active)) {
      throw new MethodNotAllowedException();
    }
    const tokenPayload: ITokenPayload = {
      _id: user._id,
      status: user.status,
      roles: user.roles,
    };
    const token = await this.generateToken(tokenPayload);
    const expireAt = moment()
      .add(1, 'day')
      .toISOString();

    await this.saveToken({
      token,
      expireAt,
      uId: user._id,
    });

    return token;
  }

  private async generateToken(data, options?: SignOptions): Promise<string> {
    return this.jwtService.sign(data, options);
  }

  private async verifyToken(token): Promise<any> {
    try {
      const data = this.jwtService.verify(token);
      const tokenExists = await this.tokenService.exists(data._id, token);
      if (tokenExists) {
        return data;
      }
      throw new UnauthorizedException();
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  private async saveToken(createUserTokenDto: CreateUserTokenDto) {
    const userToken = await this.tokenService.create(createUserTokenDto);
    return userToken;
  }
  async changePassword(userId: string, changePasswordDto: ChangePasswordDto): Promise<boolean> {
    const password = await this.userService.hashPassword(changePasswordDto.password);
    await this.userService.update(changePasswordDto._id, { password });
    await this.tokenService.deleteAll(changePasswordDto._id);
    await this.userService.update(userId, { password });
    await this.tokenService.deleteAll(userId);
    return true;
  }
}
