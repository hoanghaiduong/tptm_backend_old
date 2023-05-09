import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString, MaxLength } from "class-validator";

export class VerifyotpDTO {
 
    @MaxLength(14)
    @ApiProperty({
        default:'+84111222333'
    })
    phoneNumber: string

   
    @MaxLength(100)
    @ApiProperty({
        default:'123456'
    })
    otp: string
}
