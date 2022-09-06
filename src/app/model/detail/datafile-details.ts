import { Brand } from "../brand";
import { Promoter } from "../promoter";
import { Shop } from "../shop";
import { DetailProducts } from "./detail-data";

export class DataFileDetails{
  brand:Brand;
  date:string;
  project:string;
  chain:string;
  shop:Shop;
  promoter:Promoter;
  details: DetailProducts[];
  expanded:boolean = false;
}
