import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { TodoModule } from './modules/todo/todo.module';

@Module({
  imports: [AuthModule, TodoModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
