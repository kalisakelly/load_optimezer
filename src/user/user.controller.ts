import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './user.service';
import { AuthenticationGuard } from 'src/guards/authentication.guard';
import { AuthorizationGuard } from 'src/guards/authorization.guard';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { ApiSecurity } from '@nestjs/swagger';
import { RoleSelectorDto } from './dto/role-selector.dto';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthenticationGuard,AuthorizationGuard)
  @Roles('admin')
  @ApiSecurity('jwt')
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('me')
  getMe(@Req() {user}) {
    return user;
  }

  @UseGuards(AuthenticationGuard,AuthorizationGuard)
  @Roles('admin')
  @ApiSecurity('jwt')
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':userid')
  findOne(@Param('userid') userid: number) {
    return this.usersService.findOne(userid);
  }

  @Post('by-role')
  async findUserByRole(@Body() roleSelector: RoleSelectorDto) {
    return this.usersService.findUsersByRole(roleSelector);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
  
  @UseGuards(AuthenticationGuard,AuthorizationGuard)
  @Roles('admin')
  @Patch(':userid/role')
  @ApiSecurity('jwt')
  async updaterole(@Param('userid') userid: number, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    return this.usersService.updaterole(userid, updateUserDto);
  }

  @Get('count/users')
  async getUserCount() {

    const count = await this.usersService.getCountUsers()

    return { count }
  
  }

  
}