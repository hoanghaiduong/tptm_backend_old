import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/User.entity';
import { Repository } from 'typeorm';
import { SignUpDto } from 'src/auth/dto/sign-up.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    getAllUsers(options?: {
        page?: number;
        limit?: number;
    }): Promise<{
        data: User[];
        count: number;
    }>;
    create(inputs: SignUpDto): Promise<User>;
    createSignUp(inputs: CreateUserDto): Promise<User>;
    findById(id: string): Promise<User>;
    findByPhoneNumber(phoneNumber: string): Promise<User>;
    updateOTPCode(phoneNumber: string, otpCode: string, otpExpiration: Date): Promise<Object>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<User>;
    deleteById(id: string): Promise<User>;
    getUserByEmailOrPhoneNumber(param: string): Promise<User>;
}
