import { Injectable, Module } from "@nestjs/common";
import { FileService } from "src/shared/file.service";
import { SharedModule } from "src/shared/shared.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
    controllers: [AuthController],
    imports: [SharedModule],
    providers: [AuthService],
    exports: []
})
export class AuthModule { }