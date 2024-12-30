import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBody, ApiOperation } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('email') email: string) {
    return this.userService.findOne(email);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @Post('login')
  @ApiOperation({ summary: 'Authenticate a user and return their email and password' })
  @ApiBody({ schema: { example: { email: 'testuser@example.com', password: 'testpass' } } })
  async login(@Body() loginDto: { email: string; password: string }): Promise<{ email: string; password: string }> {
    const { email, password } = loginDto;

    // Validate the user
    const user = await this.userService.validateUser(email, password);
    if (!user) {
      throw new BadRequestException('Invalid username or password');
    }

    // Return email and password
    return {
      email: email,
      password, // Only if it's a requirement (not recommended for real-world applications)
    };
  }
}
