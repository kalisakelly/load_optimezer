import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService
  ) { }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(loginDto: { email: string; password: string }) {
    const { email, password } = loginDto;
  
    // Validate the user (assuming `validateUser` is a method that checks credentials)
    const user = await this.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }
  
    // Create the JWT payload
    const payload = { email: user.email, sub: user.id };
  
    // Sign and return the access token
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
  

}
