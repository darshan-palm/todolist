import { IsEmail, isNotEmpty, IsNotEmpty, IsOptional, IsString, IsStrongPassword, IsUUID } from "class-validator";
import { IsFullName } from "src/decorators/fullName.decorator";

export class AuthRegisterDto {

    @IsNotEmpty()
    @IsString()
    username: string

    @IsNotEmpty()
    @IsStrongPassword()
    password: string

    @IsOptional()
    @IsUUID()
    id: string
}