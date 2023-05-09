import { ApiProperty } from '@nestjs/swagger';
import { GenderEnum } from '../enum/gender.enum';
import { IsNotEmpty, IsString } from 'class-validator';
import { Role } from 'src/roles/entities/Role.entity';

export class CreateUserDto {
    @ApiProperty({ required: true, maxLength: 100 })
    first_name: string;

    @ApiProperty({ required: true, maxLength: 100 })
    last_name: string;

    @ApiProperty({ required: true, maxLength: 100, uniqueItems: true })
    email: string;

    @ApiProperty({ enum: GenderEnum, default: GenderEnum.LƯỠNG, nullable: true })
    gender: GenderEnum;

    @ApiProperty({ type: 'string', format: 'date', nullable: true })
    birthday: Date;

    @ApiProperty({ required: true, minLength: 8 })
    password: string;

    @ApiProperty({ default: false, nullable: true })
    verified: boolean;

    @ApiProperty({ default: false, nullable: true })
    disabled: boolean;

    @ApiProperty({ required: true, maxLength: 100, uniqueItems: true })
    phoneNumber: string;

    @ApiProperty({ type: 'string', format: 'binary', nullable: true })
    photo: string;

    @ApiProperty({ nullable: true })
    otp: string;

    @ApiProperty({ type: 'string', format: 'date-time', nullable: true })
    otpExpiration: Date;

    @ApiProperty({ required: true, maxLength: 100 })
    @IsString()
    @IsNotEmpty({ message: 'RoleId must not be empty' })
    roleId: string;
    role: Role
}