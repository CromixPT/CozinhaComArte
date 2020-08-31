export interface ProductModelServer {
  id: number;
  name: String;
  category: String;
  description: String;
  image: String;
  price: number;
  quantity:number;
  
}

export interface serverResponse  {
  size: number;
  artigos: ProductModelServer[]
};
