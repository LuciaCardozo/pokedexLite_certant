export interface ListaPokemonesI{
    lvl:number;
    name:string;
    id:number;
    evolutionId:number;
    type:Array<string>;
    image:string;
    abilities:Array<Array<string>>;
}