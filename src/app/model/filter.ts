export interface Filter{
    initialDate: string;
    finalDate: string;
    idBrand: number | string;
    filter: Map<string,string[]>

}