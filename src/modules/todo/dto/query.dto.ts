import { Type } from "class-transformer"
import { IsNumber, IsNumberString } from "class-validator"

export class QueryDto {

    @Type(() => Number)
    @IsNumber()
    page?: number

    @Type(() => Number)
    @IsNumber()
    limit?: number
}