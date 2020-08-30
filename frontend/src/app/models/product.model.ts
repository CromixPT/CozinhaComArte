export interface ProductModelServer{
    idArtigo: number;
    nome:string;
    descPrato: string;
    preco: number;
    imagem: string;
    descricao: string;
}

export interface ServerResponse{
    size:number;
    artigos:ProductModelServer[];
}