export interface ProductModelServer {
  id: number;
  name: String;
  category: String;
  description: String;
  image: String;
  preco: number;
}


export interface serverResponse  {
  count: number;
  products: ProductModelServer[]
};
