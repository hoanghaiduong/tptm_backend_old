import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateRoleDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example:'ADMIN'
    })
    name: string;
}
