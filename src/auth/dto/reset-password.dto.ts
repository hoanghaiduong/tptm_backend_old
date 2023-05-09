import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString, MaxLength } from "class-validator";
import { AuthPayload } from "../interfaces/auth-payload.interface";

export class ResetPasswordDTO {
    auth :AuthPayload
    @MaxLength(100)
    @ApiProperty({
        default: '123456'
    })
    otp: string

    @MaxLength(100)
    @ApiProperty({
        default: 'examplepassword'
    })
    password_old: string
    @MaxLength(100)
    @ApiProperty({
        default: 'newexamplepassword'
    })
    password_new: string
}
