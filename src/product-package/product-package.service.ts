import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductPackageDto } from './dto/create-product-package.dto';
import { UpdateProductPackageDto } from './dto/update-product-package.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductPackage } from './entities/product-package.entity';
import { Repository } from 'typeorm';
import { NotificationService } from 'src/notification/notification.service';
import { User } from 'src/user/entities/user.entity';
import * as XLSX from "xlsx";
import { Response } from "express";
import { EmailService } from 'src/email/email.service';
import { VehicleService } from 'src/vehicle/vehicle.service';


@Injectable()
export class ProductPackageService {

  constructor(
    @InjectRepository(ProductPackage) private readonly ProductpackageRepository:Repository<ProductPackage>,
    private readonly notificationService: NotificationService,
    private readonly emailService: EmailService,
    private readonly vehicleRepository: VehicleService
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
    return this.ProductpackageRepository.find(
      {relations: ['owner'], }
    );
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
    // Load the package with the owner relation
    const packageToDeliver = await this.ProductpackageRepository.findOne({
      where: { id },
      relations: ['owner'] // This ensures the owner relation is loaded
    });
      
    if (!packageToDeliver) {
      throw new Error(`Product Package with id ${id} not found`);
    }

    if(!packageToDeliver.verified==true) {
      throw new Error(`Product Package with id ${id} is not verified`);
    }
  
    // Check if owner exists and has an email
    if (!packageToDeliver.owner || !packageToDeliver.owner.email) {
      throw new Error('Package owner not found or owner email missing');
    }
  
    packageToDeliver.delivered = true;
    await this.ProductpackageRepository.save(packageToDeliver);
  
    try {
      await this.emailService.deliverysuccess(packageToDeliver.owner.email , packageToDeliver.id);
    } catch (emailError) {
      console.error('Failed to send delivery email:', emailError);
    }
  
    return packageToDeliver;
  }

// async findAllByUser(userId: number): Promise<ProductPackage[]> {
//   // Solution 1: Using find with where clause
//   return this.ProductpackageRepository.find({
//     where: { owner: { userid: userId } },
//     relations: ['owner'], // Include owner data if needed
//   });

// }

async getmypackages(userId: number): Promise<ProductPackage[]> {

  return this.ProductpackageRepository.query(
    `select * from product_package where "ownerUserid" = $1`,
    [userId],
  );
}

async exportToExcel(productPackage: ProductPackage[], res: Response) {
  const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(productPackage);
  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "productpackages");
  const buf = XLSX.write(wb, { type: "buffer", bookType: "xlsx" });
  res.setHeader(
    "Content-Disposition",
    'attachment; filename="productpackages.xlsx"',
  );
  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  );
  res.send(buf);
}

async getUserReport(): Promise<ProductPackage[]> {
  return this.ProductpackageRepository.query(
    `SELECT * 
     FROM "product_package"`
  );
}

}

