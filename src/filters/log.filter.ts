import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import * as fs from 'fs';
import * as path from 'path'

interface LogResponse {
    status: number,
    timestamp: string,
    path: string,
    message: string
}

@Catch()
export class LogFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();
        const filePath = path.join(process.cwd(), "storage", "logs", "time.json")
        const obj = {
            status: status,
            timestamp: new Date().toUTCString(),
            path: request.url,
            message: exception.message,
        }
        fs.readFile(filePath, (err, data) => {
            const array: LogResponse[] = JSON.parse(data.toString())
            array.push(obj)
            fs.writeFile(filePath, JSON.stringify(array), () => { })
        })
        response.end()
    }
}