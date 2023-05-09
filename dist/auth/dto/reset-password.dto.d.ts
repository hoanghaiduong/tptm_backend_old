import { AuthPayload } from "../interfaces/auth-payload.interface";
export declare class ResetPasswordDTO {
    auth: AuthPayload;
    otp: string;
    password_old: string;
    password_new: string;
}
