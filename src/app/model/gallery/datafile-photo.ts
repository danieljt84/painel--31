import { Photo } from "./photo";

export interface DataFilePhoto{
  brand:string
  data:string;
  project:string;
  chain:string;
  shop:string;
  promoter:string;
  photos:Photo[];
}
