import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { StockModule } from './stock/stock.module';
import { VehicleModule } from './vehicle/vehicle.module';
import { NotificationModule } from './notification/notification.module';
import { ItemModule } from './item/item.module';
import { Vehicle } from './vehicle/entities/vehicle.entity';
import { Notification } from './notification/entities/notification.entity';
import { Stock } from './stock/entities/stock.entity';
import { Item } from './item/entities/item.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: "localhost",
      port: 5433,
      username: "postgres",
      password: "1234",
      database: "loadfleat",
      entities: [User, Vehicle, Notification, Stock, Item],
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    StockModule,
    VehicleModule,
    NotificationModule,
    ItemModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
