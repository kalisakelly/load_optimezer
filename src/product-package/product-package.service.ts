import { Injectable } from '@nestjs/common';
import { CreateProductPackageDto } from './dto/create-product-package.dto';
import { UpdateProductPackageDto } from './dto/update-product-package.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductPackage } from './entities/product-package.entity';
import { Repository } from 'typeorm';
import { NotificationService } from 'src/notification/notification.service';

@Injectable()
export class ProductPackageService {

  constructor(
    @InjectRepository(ProductPackage) private readonly ProductpackageRepository:Repository<ProductPackage>,
    private readonly notificationService: NotificationService
  ){

  }
  async create(createProductPackageDto: CreateProductPackageDto) {
    const productPackage = await this.ProductpackageRepository.create(createProductPackageDto)
    await this.ProductpackageRepository.save(productPackage);

    return productPackage;
  }

  findAll() {
    return this.ProductpackageRepository.find();
  }

  findOne(id: number) {
    return this.ProductpackageRepository.findOneBy({id});
  }

  update(id: number, updateProductPackageDto: UpdateProductPackageDto) {
    
    const packages = this.ProductpackageRepository.findOneBy({id})

    if(!packages){
      throw new Error(`Product Package with id ${id} not found`)
    }



    return this.ProductpackageRepository.update(id ,updateProductPackageDto)
  }

  remove(id: number) {
    const packages = this.ProductpackageRepository.findOneBy({id})

    if(!packages){
      throw new Error(`Product Package with id ${id} not found`)
    }

    return this.ProductpackageRepository.delete(id)

  }

  async verifyProductPackage(id: number) {
    const packageToVerify = await this.ProductpackageRepository.findOneBy({ id });

    if (!packageToVerify) {
      throw new Error(`Product Package with id ${id} not found`);
    }

    packageToVerify.verified = true;
    await this.ProductpackageRepository.save(packageToVerify);

    // Create verification notification
    await this.notificationService.create({
      details: `Product Package #${id} has been successfully verified`,
      visibility: true
    });

    return packageToVerify;
  }
}
