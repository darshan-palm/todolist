import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req } from "@nestjs/common";
import { Request } from "express";
import { QueryDto } from "./dto/query.dto";
import { TodoDto } from "./dto/todo.dto";
import { TodoService } from "./todo.service";


@Controller('todo')
export class TodoController {
    constructor(private readonly todoService: TodoService) { }
    @Post('addTodo')
    async addTodo(@Body() todo: TodoDto, @Req() req: Request) {
        return { data: await this.todoService.addTodo(todo, req["user"]) }
    }

    @Get('all')
    async fetchAll(@Query() query: QueryDto, @Req() req: Request) {
        return await this.todoService.fetchAll(req["user"], query.page, query.limit)
    }

    @Get(':id')
    async findOne(@Param('id') id: string, @Req() req: Request) {
        return { data: this.todoService.getTodo(id, req["user"]) }
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Req() req: Request, @Body() todo: Partial<TodoDto>) {
        return { data: this.todoService.update(id, todo, req["user"]) }
    }

    @Delete(':id')
    async delete(@Param('id') id: string, @Req() req: Request, @Body() todo: Partial<TodoDto>) {
        return { data: this.todoService.delete(id, req["user"]) }
    }
}