import { BadRequestException, HttpStatus, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters/http.filter';
import { LoggingInterceptor } from './interceptors/log.interceptor';
import { ResponseInterceptor } from './interceptors/response.interceptors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api')
  app.useGlobalInterceptors(new LoggingInterceptor(), new ResponseInterceptor())
  app.useGlobalFilters(new HttpExceptionFilter())
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    exceptionFactory(errors) {
      const message = {}
      errors.map(item => message[item.property] = Object.values(item.constraints))
      return new BadRequestException(message)
    },
  }))
  await app.listen(3000);
}
bootstrap();
