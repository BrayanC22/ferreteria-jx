import { AutorInterface } from "./AutorInterface";
import { OfertaInterface } from "./OfertaInterface";

export interface LibroInterface {
   
    idLibro : number;
    idAuto:number;
    titulo:string;
    idOferta: number;
    descripcion:string;
    isbn:string;
    idCategori:string;
    precio : number;
}

