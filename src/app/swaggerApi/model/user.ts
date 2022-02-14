/**
 * Pokedex API
 * API to provide access to the pokedex database
 *
 * OpenAPI spec version: 2.0.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

export interface User { 
    id?: string;
    role?: Array<string>;
    pokemonCount?: number;
    firstName?: string;
    lastName?: string;
    username?: string;
    password?: string;
}