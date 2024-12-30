import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository:Repository<User>
  ) {}
  async create(UserData: Partial<User>): Promise<User> {
    
    const user = await this.userRepository.findOneBy({ email: UserData.email })
    if (user) {
      
      throw 'User already exists'
    }

    return this.userRepository.save(UserData)
  }
    
  async validateUser(email: string, password: string): Promise<any> {
    
    const user = await this.userRepository.findOneBy({ email: email });
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

    
  

  findAll() {
    return this.userRepository.find();
  }

  findOne(email: string) {
    return  this.userRepository.findOneBy({ email: email });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id,updateUserDto)
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }
}
