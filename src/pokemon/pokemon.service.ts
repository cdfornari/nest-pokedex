import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class PokemonService {

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>
  ){ }

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLowerCase().trim();
    try{
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;
    }catch(e){
      this.handleException(e);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const {limit = 40, offset = 0} = paginationDto;
    return await this.pokemonModel.find()
    .limit(limit)
    .skip(offset)
    .sort({pokedexNumber: 1})
    .select('-__v');
  }

  async findOne(searchTerm: string) {
    let pokemon: Pokemon;

    if(!isNaN(+searchTerm)) 
      pokemon = await this.pokemonModel.findOne({pokedexNumber: +searchTerm});
    else if(isValidObjectId(searchTerm))
      pokemon = await this.pokemonModel.findById(searchTerm);
    else 
      pokemon = await this.pokemonModel.findOne({name: searchTerm.toLowerCase().trim()});

    if(!pokemon) throw new NotFoundException(`Pokemon ${searchTerm} not found`);
    return pokemon;
  }

  async update(searchTerm: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon = await this.findOne(searchTerm);
    if(updatePokemonDto.name) pokemon.name = updatePokemonDto.name.toLowerCase().trim();
    try{
      await pokemon.updateOne(updatePokemonDto);
      return {...pokemon.toJSON(),...updatePokemonDto};
    }catch(e){
      this.handleException(e);
    }
  }

  async remove(id: string) {
    const {deletedCount} = await this.pokemonModel.deleteOne({_id: id});
    if(deletedCount === 0) throw new NotFoundException(`Pokemon with id ${id} not found`);
  }

  private handleException(e: any) {
    if(e.code === 11000){
      throw new BadRequestException(`Pokemon already exists in DB ${JSON.stringify(e.keyValue)}`);
    }
    console.log(e)
    throw new InternalServerErrorException('Error creating pokemon');
  }

}
