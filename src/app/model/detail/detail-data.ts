import { Product } from "./Product";

export interface DetailProducts{
  product: Product;
  price: number;
  stock: number;
  validity: Date;
  ruptura: string;
}
