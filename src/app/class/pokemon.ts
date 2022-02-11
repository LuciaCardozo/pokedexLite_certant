import { PokemonAbilities } from "./pokemon-abilities";

export class Pokemon {
    id?: number;
    name?: string;
    lvl?: number;
    evolutionId?: number;
    abilities?: Array<PokemonAbilities>;
    type?: Array<string>;
    image?: string;
    
}
