import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common"
import { Categoria } from "../entities/categoria.entity"
import { CategoriaService } from "../services/categoria.service"


@Controller("/categoria")
export class CategoriaController{
    constructor (private readonly CategoriaService: CategoriaService){}

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Categoria[]>{
        return this.CategoriaService.findAll();
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe) id: number): Promise<Categoria>{
        return this.CategoriaService.findById(id);
    }

    @Post()
    @HttpCode(HttpStatus.OK)
    create(@Body() categoria: Categoria): Promise<Categoria>{
        return this.CategoriaService.create(categoria);
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body() categoria: Categoria): Promise<Categoria>{
        return this.CategoriaService.create(categoria);
    }
    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe) id: number){
        return this.CategoriaService.delete(id);
    }
}