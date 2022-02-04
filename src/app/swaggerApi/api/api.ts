export * from './default.service';
import { DefaultService } from './default.service';
export * from './pokemon.service';
import { PokemonService } from './pokemon.service';
export * from './security.service';
import { SecurityService } from './security.service';
export const APIS = [DefaultService, PokemonService, SecurityService];
