import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsUUID, Max, Min } from "class-validator";
import { AuthPayload } from "src/auth/interfaces/auth-payload.interface";

export class CreateCartDto {
    auth: AuthPayload
}
