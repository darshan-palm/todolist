import { Injectable } from "@nestjs/common";
import * as fs from 'fs';

@Injectable()
export class FileService {
    readFile(filePath: string) {
        return new Promise<any>((resolve, reject) => {
            fs.readFile(filePath, (err: NodeJS.ErrnoException, data) => {
                if (err) reject(err)
                else {
                    try {
                        resolve(JSON.parse(data.toString()))
                    } catch (error) {
                        resolve([])
                    }
                }
            })
        })
    }

    writeFile(filePath: string, data: any) {
        return new Promise<void>((resolve, reject) => {
            fs.writeFile(filePath, JSON.stringify(data), (err) => {
                if (err) reject(err)
                resolve()
            })
        })
    }

    dir(dirName: string) {
        return new Promise<void>((resolve, reject) => {
            fs.access(dirName, (err) => {
                if (err) {
                    fs.mkdir(dirName, (err) => {
                        if (err) reject(err)
                        resolve()
                    })
                }
                else {
                    resolve()
                }
            })
        })
    }

    checkFile(filePath: string) {
        return new Promise<void>((resolve, reject) => {
            fs.access(filePath, (err) => {
                if (err) {
                    fs.writeFile(filePath, JSON.stringify([]), () => {
                        if (err) reject(err)
                        resolve()
                    })
                }
                resolve()
            })
        })
    }
}