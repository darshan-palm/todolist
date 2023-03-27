import { Injectable, NotFoundException } from "@nestjs/common";
import { randomUUID } from "crypto";
import * as path from 'path'
import { FileService } from "src/shared/file.service";
import { TodoDto } from "./dto/todo.dto";



@Injectable()
export class TodoService {
    constructor(private readonly fileService: FileService) { }

    private file = path.join(process.cwd(), "storage")


    private async getArray(username: string) {
        await this.fileService.dir(path.join(this.file, username))
        const fileName = path.join(this.file, username, "store.json")
        await this.fileService.checkFile(fileName)
        const array: TodoDto[] = await this.fileService.readFile(fileName)
        return { array, fileName }
    }

    async addTodo(todo: TodoDto, username: string) {
        try {
            const { array, fileName } = await this.getArray(username)
            const id = randomUUID()
            array.push({ ...todo, id })
            this.fileService.writeFile(fileName, array)
            return
        } catch (error) {
            throw error
        }
    }

    async fetchAll(username: string, page: number = 1, limit: number = 3) {
        try {
            const { array } = await this.getArray(username)
            return {
                data: structuredClone(array.slice(((page - 1) * limit), (page * limit))),
                meta: {
                    totalItems: array.length,
                    currentPage: page,
                    pageSize: (limit < array.length) ? limit : array.length,
                    totalPages: Math.ceil(array.length / limit),
                    startPage: 1,
                    endPage: Math.ceil(array.length / limit),
                }
            }
        } catch (error) {
            throw error
        }
    }

    async getTodo(id: string, username: string) {
        try {
            const { array } = await this.getArray(username)
            const result = array.find(item => item.id === id)
            if (!result) { throw new NotFoundException("Not found.") }
            else return result
        } catch (error) {
            throw error
        }
    }

    async update(id: string, todo: Partial<TodoDto>, username: string) {
        try {
            const { array, fileName } = await this.getArray(username)
            const result = array.findIndex(item => item.id === id)
            if (result === -1) { throw new NotFoundException("Not found.") }
            else {
                array[result] = { ...array[result], ...todo, id: array[result].id }
                this.fileService.writeFile(fileName, array)
                return
            }
        } catch (error) {
            throw error
        }
    }

    async delete(id: string, username: string) {
        try {
            const { array, fileName } = await this.getArray(username)
            const result = array.findIndex(item => item.id === id)
            if (result === -1) { throw new NotFoundException("Not found.") }
            else {
                array.splice(result, 1)
                this.fileService.writeFile(fileName, array)
                return
            }
        } catch (error) {
            throw error
        }
    }
}