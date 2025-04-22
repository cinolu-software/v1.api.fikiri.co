import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configServie: ConfigService) => ({
        type: 'mysql',
        port: +configServie.get('DB_PORT'),
        host: configServie.get('DB_HOST'),
        username: configServie.get('DB_USERNAME'),
        subscribers: ['dist/**/*.subscriber.js'],
        password: configServie.get('DB_PASSWORD'),
        database: configServie.get('DB_NAME'),
        synchronize: false,
        autoLoadEntities: true
      })
    })
  ]
})
export class DatabaseModule {}
