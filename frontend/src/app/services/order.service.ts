import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {any} from "codelyzer/util/function";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private products: ProductResponseModel[] = [];
  private serverUrl = environment.serverURL;

  constructor(private http: HttpClient) {

  }

  getSingleOrder(orderId: number) {
    return this.http.get<ProductResponseModel[]>(this.serverUrl+'/encomendas'+orderId).toPromise();
  }

}

interface ProductResponseModel{
  id: number;
  title: string;
  descricao: string;
  preco: number;
  quantidadeEcomendada: number;
  imagem: string;
}
