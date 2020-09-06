export interface Category {
  id:number;
  description:String;
}
export interface ProductModelServer {
  id: number;
  name: String;
  description: String;
  mainImage: String;
  price: number;
  quantity:number;
  category:Category;
}


export interface ServerResponse{
  Products : ProductModelServer[];
}
