import { BadRequestException, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const accessToken = req.headers.authorization;
        if (!accessToken) throw new BadRequestException("Invalid Token.");
        else {
            const name = Buffer.from(accessToken.split(' ')[1], 'base64').toString('utf-8').split(":")[0].split("@")[0]
            req["user"] = name
            next()
        }
    }
}
