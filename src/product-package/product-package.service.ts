import { Injectable } from '@nestjs/common';
import { CreateProductPackageDto } from './dto/create-product-package.dto';
import { UpdateProductPackageDto } from './dto/update-product-package.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductPackage } from './entities/product-package.entity';
import { Repository } from 'typeorm';
import { NotificationService } from 'src/notification/notification.service';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class ProductPackageService {

  constructor(
    @InjectRepository(ProductPackage) private readonly ProductpackageRepository:Repository<ProductPackage>,
    private readonly notificationService: NotificationService
  ){

  }

  async generateNextId(): Promise<string> {
    // Fetch the last used ID from the database
    const lastProductPackage = await this.ProductpackageRepository
      .createQueryBuilder('productPackage')
      .orderBy('productPackage.id', 'DESC')
      .getOne();

    let nextNumber = 1;
    if (lastProductPackage && lastProductPackage.id) {
      // Extract the number part of the last ID
      const lastNumber = parseInt(lastProductPackage.id.split('-')[1], 10);
      if (!isNaN(lastNumber)) {
        nextNumber = lastNumber + 1;
      }
    }

    // Format the next ID (e.g., 'prod-0002')
    return `prod-${String(nextNumber).padStart(4, '0')}`;
  }
  async create(
    createProductPackageDto: CreateProductPackageDto,
    owner:User
  ): Promise<ProductPackage> {
    const productPackage = this.ProductpackageRepository.create({
      ...createProductPackageDto,
      owner,
    });

    productPackage.id = await this.generateNextId();

    await this.ProductpackageRepository.save(productPackage);

    return productPackage;
  }

  findAll() {
    return this.ProductpackageRepository.find();
  }

  findOne(id: string) {
    return this.ProductpackageRepository.findOneBy({id});
  }

  update(id: string, updateProductPackageDto: UpdateProductPackageDto) {
    
    const packages = this.ProductpackageRepository.findOneBy({id})

    if(!packages){
      throw new Error(`Product Package with id ${id} not found`)
    }



    return this.ProductpackageRepository.update(id ,updateProductPackageDto)
  }

  remove(id: string) {
    const packages = this.ProductpackageRepository.findOneBy({id})

    if(!packages){
      throw new Error(`Product Package with id ${id} not found`)
    }

    return this.ProductpackageRepository.delete(id)

  }

  async verifyProductPackage(id: string) {
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

async deliverProductPackage(id: string) {

  const packageToDeliver = await this.ProductpackageRepository.findOneBy({ id });

  if (!packageToDeliver) {
    throw new Error(`Product Package with id ${id} not found`);
  }

  packageToDeliver.delivered = true;
  await this.ProductpackageRepository.save(packageToDeliver);

  return packageToDeliver;
}

async findAllByUser(userId: number): Promise<ProductPackage[]> {
  return await this.ProductpackageRepository.find({
    where: { owner: { userid: userId } }, 
    relations: ['owner'], 
  });
}
}


