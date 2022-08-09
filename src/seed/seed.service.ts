import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { PokeApiResponse } from './interfaces/pokeapi-response.interface';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly httpAdapter: AxiosAdapter,
  ) {}

  async execute(){
    await this.pokemonModel.deleteMany({});
    const data = await this.httpAdapter.get<PokeApiResponse>('https://pokeapi.co/api/v2/pokemon?limit=905');
    const pokemonToInsert = []
    data.results.forEach(({name, url}) => {
      const segments = url.split('/')
      const pokedexNumber: number = +segments[segments.length - 2]
      pokemonToInsert.push({name,pokedexNumber})
    })
    await this.pokemonModel.insertMany(pokemonToInsert)
    return 'Seeded successfully'; 
  }

}
