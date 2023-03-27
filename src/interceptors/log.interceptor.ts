import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import * as fs from 'fs';
import * as path from 'path';
import { Request } from 'express';

interface LogResponse {
    url: string,
    reqTime: string,
    resTime: string,
    processedTime: string,
    user: string
}

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const req: Request = context.switchToHttp().getRequest();
        const filePath = path.join(process.cwd(), "storage", "logs", "time.json")
        req.url;
        const reqTime = Date.now();

        return next
            .handle()
            .pipe(
                tap({
                    complete: () => {
                        const resTime = Date.now();
                        const obj = {
                            url: req.url,
                            reqTime: new Date(reqTime).toUTCString(),
                            resTime: new Date(resTime).toUTCString(),
                            processedTime: (resTime - reqTime) + "ms",
                            user: req["user"]
                        }
                        fs.readFile(filePath, (err, data) => {
                            const array: LogResponse[] = JSON.parse(data.toString())
                            array.push(obj)
                            fs.writeFile(filePath, JSON.stringify(array), () => { })
                        })
                    },
                }),
            );
    }
}