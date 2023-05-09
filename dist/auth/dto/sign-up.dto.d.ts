import { Role } from "../../roles/entities/Role.entity";
export declare class SignUpDto {
    phoneNumber: string;
    password: string;
    email: string;
    roleId: string;
    role: Role;
}
