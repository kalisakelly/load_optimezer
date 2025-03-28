import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository, RoleSpecification } from 'typeorm';
import { RoleSelectorDto } from './dto/role-selector.dto';
import { PaginatedUsersDto } from './dto/paginateduser.dto';

@Injectable()
export class UsersService {

  constructor(@InjectRepository(User) private userrepository:Repository<User>){}
  
  async getByEmail(email:string){
    const user = await this.userrepository.findOneBy({ email })
    if(user){
      return user;
    }
    throw new HttpException('User with this email does not exist', HttpStatus.NOT_FOUND);
  }

  async create(createUserDto:CreateUserDto):Promise<User>{

    
    const user = new User();
    user.email=createUserDto.email;
    user.password=createUserDto.password;

    return this.userrepository.save(user);

  }

  findAll() {
    return this.userrepository.find();
  }

    findOne(userid: number) {
    return this.userrepository.findOneBy({userid})
  }

  async update(userId: number, user: Partial<User>): Promise<void> {
    await this.userrepository.update(userId, user);
  }

  async updaterole(userid:number, updateUserDto:UpdateUserDto) : Promise<User>{

    const user = await this.findOne(userid);
    Object.assign(user, updateUserDto)
    return this.userrepository.save(user)
  }
  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findByVerificationToken(token: string): Promise<User> {
    return this.userrepository.findOneBy({ emailVerificationToken: token });
  }

  async findByPasswordResetToken(token: string): Promise<User> {
    return this.userrepository.findOneBy({ passwordResetToken: token });
  }

  async findUsersByRole(roleSelector: RoleSelectorDto): Promise<PaginatedUsersDto> {
    const { role, page = 1, limit = 10 } = roleSelector;
    const skip = (page - 1) * limit;

    const [users, total] = await this.userrepository.findAndCount({
      where: { role },
      skip,
      take: limit,
    });

    return {
      data: users,
      meta: {
        total,
        page,
        limit,
        last_page: Math.ceil(total / limit),
      },
    };
  }

}