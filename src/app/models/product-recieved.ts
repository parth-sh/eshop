import { Product } from './product';

export interface ProductRecieved extends Product {
    key: string;
}