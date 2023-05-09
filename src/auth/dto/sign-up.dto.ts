import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString, MaxLength } from "class-validator";
import { Role } from "../../roles/entities/Role.entity";

export class SignUpDto {

    @MaxLength(14)
    @ApiProperty({
        default: '+84111222333'
    })
    phoneNumber: string


    @MaxLength(100)
    @IsNotEmpty()
    @ApiProperty({
        default: 'examplepassword',
        description: 'Nhập mật khẩu bất kì sẽ được mã hoá lại sau đó'
    })
    password: string;

    @IsEmail()
    @MaxLength(100)
    @ApiProperty({
        default: 'example@gmail.com'
    })
    email: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        default: 'ecc9d4a2-4bf3-40fe-9dc5-89c64365af6d',
        description: 'Truyền id của role vào đây',
        // properties: {
        //     id: {
        //         type: 'number',
        //         example: 1
        //     }
        // }
    })
    @IsString()
    @IsNotEmpty({ message: 'RoleId must not be empty' })
    roleId: string;
    role: Role


}
