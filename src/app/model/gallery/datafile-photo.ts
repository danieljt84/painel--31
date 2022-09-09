import { Brand } from "../brand";
import { Promoter } from "../promoter";
import { Shop } from "../shop";
import { Photo } from "./photo";

export interface DataFilePhoto{
  brand:Brand
  date:string;
  project:string;
  chain:string;
  shop:Shop;
  promoter:Promoter;
  photos:Photo[];
}
