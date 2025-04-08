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
import { StockEntryModule } from './stock_entry/stock_entry.module';
import { StockEntry } from './stock_entry/entities/stock_entry.entity';
import { PackagingModule } from './packaging/packaging.module';
import { Packaging } from './packaging/entities/packaging.entity';
import { EmailModule } from './email/email.module';
import { ProductPackageModule } from './product-package/product-package.module';
import { ProductPackage } from './product-package/entities/product-package.entity';
import { PackagingRequestModule } from './packaging-request/packaging-request.module';
import { PackagingRequest } from './packaging-request/entities/packaging-request.entity';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { MulterModule } from '@nestjs/platform-express';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "1234",
      database: "loadfleat",
      entities: [
        User, 
        Vehicle, 
        Notification,
        Stock, 
        Item,
        StockEntry,
        Packaging,
        ProductPackage,
        PackagingRequest],
      synchronize: true,
    }),
    UserModule,
    MulterModule.register({dest:'./uploads'}),
    AuthModule,
    StockModule,
    VehicleModule,
    NotificationModule,
    ItemModule,
    StockEntryModule,
    PackagingModule,
    EmailModule,
    ProductPackageModule,
    PackagingRequestModule,
    CloudinaryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
