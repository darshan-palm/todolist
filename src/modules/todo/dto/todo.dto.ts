import { Type } from "class-transformer";
import { IsBoolean, IsDate, IsNotEmpty, IsOptional, IsString, IsUUID, Length, MaxLength } from "class-validator";

export class TodoDto {

    @IsNotEmpty()
    @Length(5, 50)
    title: string

    @IsOptional()
    @IsString()
    @MaxLength(400)
    description: string

    @IsOptional()
    @IsBoolean()
    @Type(() => Boolean)
    completed: boolean

    @IsNotEmpty()
    @IsDate()
    @Type(() => Date)
    due: Date

    @IsOptional()
    @IsUUID()
    id: string
}