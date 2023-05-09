import { GenderEnum } from '../enum/gender.enum';
import { Role } from 'src/roles/entities/Role.entity';
export declare class CreateUserDto {
    first_name: string;
    last_name: string;
    email: string;
    gender: GenderEnum;
    birthday: Date;
    password: string;
    verified: boolean;
    disabled: boolean;
    phoneNumber: string;
    photo: string;
    otp: string;
    otpExpiration: Date;
    roleId: string;
    role: Role;
}
