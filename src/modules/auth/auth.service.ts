import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { randomUUID } from "crypto";
import * as path from "path";
import { FileService } from "src/shared/file.service";
import { AuthRegisterDto } from "./dto/register.dto";

enum By {
    Username = "username",
    Id = "id"
}

// {YourName}@plaminfotech|Palm@{YourName}2023
@Injectable()
export class AuthService {

    constructor(private readonly fileService: FileService) { }
    private file = path.join(process.cwd(), "storage", "auth", "users.json");

    getUser<T>(by: By, value: string, array: Array<T>) {
        return array.find(item => item[by] === value)
    }

    async register(authDto: AuthRegisterDto) {
        try {
            const array: AuthRegisterDto[] = await this.fileService.readFile(this.file);
            const existingUser = this.getUser(By.Username, authDto.username, array)
            if (existingUser) throw new ConflictException("User exists.")
            else {
                const id = randomUUID()
                const basic = Buffer.from(`${authDto.username}@palminfotech:${authDto.password}`).toString('base64')
                array.push({ ...authDto, id })
                this.fileService.writeFile(this.file, array)
                return { id, basic }
            }
        } catch (error) {
            throw error
        }
    }

    async login(authDto: AuthRegisterDto) {
        try {
            const array: AuthRegisterDto[] = await this.fileService.readFile(this.file);
            let existingUser = this.getUser<AuthRegisterDto>(By.Username, authDto.username, array)
            if (!existingUser) throw new NotFoundException("User not found.")
            else {
                if (existingUser.password === authDto.password) {
                    const basic = Buffer.from(`${existingUser.username}@palminfotech:${existingUser.password}`).toString('base64')
                    return { id: existingUser.id, basic }
                }
                else throw new ConflictException("Password don't match.")
            }
        } catch (error) {
            throw error
        }
    }
}