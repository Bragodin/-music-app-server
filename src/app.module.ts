import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TokenModule } from './token/token.module';
import { MailModule } from './mail/mail.module';
import { MusicModule } from './music/music.module';
import { MulterModule } from '@nestjs/platform-express';

const environment = process.env.NODE_ENV || 'development';

@Module({
  imports: [
    UserModule,
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: `.env.${environment}`,
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      process.env.MONGODB_WRITE_CONNECTION_STRING,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      },
  ),
    TokenModule,
    MailModule,
    MusicModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
