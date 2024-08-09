import { Categoria } from '../entities/categoria.entity';
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository } from "typeorm";


@Injectable()
export class CategoriaService {
    constructor (
        @InjectRepository(Categoria)
        private categoriaRepository: Repository<Categoria>
    ){}

    async findAll(): Promise<Categoria[]>{
        return await this.categoriaRepository.find({
            relations: {
                produto: true
            }
     });
       
    }
    
    async findById (id: number): Promise <Categoria>{

        let categoria = await this.categoriaRepository.findOne({
            where: {
                id
            },
            relations: {
                produto: true
            }
        });
        if (!categoria)
         throw new HttpException('Categoria não encontrada!', HttpStatus.NOT_FOUND);
    
        return categoria;
        
    }
        async create(categoria: Categoria): Promise <Categoria> {
            return await this.categoriaRepository.save(categoria)
        }
        
        async update (categoria: Categoria): Promise<Categoria>{

            let buscaCategoria: Categoria = await this.findById(categoria.id);

            if(!buscaCategoria || !categoria.id)
                throw new HttpException('Categoria não encontrada', HttpStatus.NOT_FOUND);

            return await this. categoriaRepository.save(categoria);
        }

        async delete (id: number): Promise<DeleteResult>{

            let buscaCategoria = await this.findById(id);

            if(!buscaCategoria)
                throw new HttpException('Categoria não encontrada', HttpStatus.NOT_FOUND);

            return await this. categoriaRepository.delete(id);
        }
}