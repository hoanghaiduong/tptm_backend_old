import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/User.entity';
import { Repository } from 'typeorm';
import { SignUpDto } from 'src/auth/dto/sign-up.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SignInDto } from 'src/auth/dto/sign-in.dto';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }


  // async findAll(
  //   relations: string[] = [],
  //   throwsException = false,
  // ): Promise<UserEntity[]> {
  //   return await this.usersRepository.getAllEntity(relations, throwsException);
  // }
  async getAllUsers(options?: { page?: number; limit?: number }): Promise<{ data: User[]; count: number }> {
    const { page, limit } = options ?? {};
    if (page && limit) {
      const [data, count] = await this.userRepository.findAndCount({
        take: limit,
        skip: (page - 1) * limit,
      });
      return { data, count };
    } else {
      const data = await this.userRepository.find();
      return { data, count: data.length };
    }
  }

  async create(inputs: SignUpDto): Promise<User> {
    const user = await this.userRepository.create(inputs);
    return this.userRepository.save(user);
  }
  async createSignUp(inputs: CreateUserDto): Promise<User> {
    const user = await this.userRepository.create(inputs);
    return this.userRepository.save(user);
  }

  async findById(id: string): Promise<User> {
    const user = this.userRepository.findOne({
      where: { id }
    });
    if (!user) {
      throw new NotFoundException("User not found");
    }
    return user;
  }
  async findByPhoneNumber(phoneNumber: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { phoneNumber } });
    if (!user) {
      throw new NotFoundException("User not found");
    }
    return user;
  }

  async updateOTPCode(phoneNumber: string, otpCode: string, otpExpiration: Date): Promise<Object> {
    const user = await this.findByPhoneNumber(phoneNumber);
    // if (!user) {
    //   throw new NotFoundException({
    //     message: 'User NOT FOUND || Phone number is not available',
    //     statusCode: 404
    //   });
    // }
    // Check if existing OTP code has expired
    if (user.otpExpiration && user.otpExpiration < new Date()) {
      user.otp = null;
      user.otpExpiration = null;
    }

    // Update OTP code and expiration time
    user.otp = otpCode;
    user.otpExpiration = otpExpiration;

    try {
      const isSaved = await this.userRepository.save(user);
      if (isSaved) {
        return new Promise((resolve, reject) => {
          resolve({
            message: 'Gửi mã OTP thành công !',
            otp: `Mã OTP của bạn là: ${isSaved.otp}`,
            status: 200
          })
        })
      }
    } catch (error) {
      console.log(error);
      throw new Error('Failed to update OTP code');
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const merged = this.userRepository.merge(user, updateUserDto);

    const updated = await this.userRepository.update(id, merged);
    if(!updated) {
      throw new BadRequestException(
        "User update failed"
      )
    }
    return merged;
  }
  async deleteById(id: string): Promise<User> {
    const userToDelete = await this.userRepository.findOne({
      where: { id }
    });
    if (!userToDelete) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    await this.userRepository.delete(id);
    return userToDelete;
  }



  async getUserByEmailOrPhoneNumber(param: string): Promise<User> {
    return this.userRepository.findOne({
      where: [{ email: param }, { phoneNumber: param }]
    });
  }

}
