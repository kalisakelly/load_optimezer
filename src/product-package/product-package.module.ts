import { Module } from '@nestjs/common';
import { ProductPackageService } from './product-package.service';
import { ProductPackageController } from './product-package.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { ProductPackage } from './entities/product-package.entity';
import { JwtService } from '@nestjs/jwt';
import { NotificationService } from 'src/notification/notification.service';
import { Notification } from'src/notification/entities/notification.entity';

@Module({
  imports:[TypeOrmModule.forFeature([ProductPackage,User,Notification])],
  controllers: [ProductPackageController],
  providers: [ProductPackageService,JwtService,NotificationService],
})
export class ProductPackageModule {}
