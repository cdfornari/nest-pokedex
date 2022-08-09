export interface PokeApiResponse {
    count:    number;
    next:     string;
    previous: null;
    results:  SmallInfoPokemon[];
}

export interface SmallInfoPokemon {
    name: string;
    url:  string;
}
