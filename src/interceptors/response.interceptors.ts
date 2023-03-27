import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


export interface Response<T> {
    status: number;
    message: string;
    data: any;
    meta: any
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<Response<any>> {
        const status = context.switchToHttp().getResponse().statusCode
        return next
            .handle()
            .pipe(map(data => {
                return {
                    status: status,
                    message: "Success",
                    data: data.data,
                    meta: data.meta
                }
            }))
    }
}