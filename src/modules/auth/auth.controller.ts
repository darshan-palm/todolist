import { Body, Controller, Injectable, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthRegisterDto } from "./dto/register.dto";

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }
    @Post('register')
    async register(@Body() authDto: AuthRegisterDto) {
        return { data: await this.authService.register(authDto) }
    }
    @Post('login')
    async login(@Body() authDto: AuthRegisterDto) {
        return { data: await this.authService.login(authDto) }
    }
}