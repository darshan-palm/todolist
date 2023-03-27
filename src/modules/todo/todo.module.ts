import { Injectable, MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { AuthMiddleware } from "src/middlewares/auth.middleware";
import { SharedModule } from "src/shared/shared.module";
import { TodoController } from "./todo.controller";
import { TodoService } from "./todo.service";

@Module({
    imports: [SharedModule],
    controllers: [TodoController],
    exports: [],
    providers: [TodoService]
})
export class TodoModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthMiddleware)
            .forRoutes(
                { path: '/todo/addTodo', method: RequestMethod.POST },
                { path: "/todo/all", method: RequestMethod.GET },
                { path: "/todo/:id", method: RequestMethod.GET },
                { path: "/todo/:id", method: RequestMethod.PATCH },
                { path: "/todo/:id", method: RequestMethod.DELETE }
            );
    }
}