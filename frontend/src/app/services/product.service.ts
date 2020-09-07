import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {ProductModelServer, ServerResponse} from "../models/product.model";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url = environment.serverURL;

  constructor(private http: HttpClient) {
  }

  getAllProducts(limitOfResults=10): Observable<ServerResponse> {
    var teste = this.http.get<ServerResponse>(this.url + 'Products', {
      params: {
        limit: limitOfResults.toString()
      }
    });
    return teste
  }

  getSingleProduct(id: Number): Observable<ProductModelServer> {
    return this.http.get<ProductModelServer>(this.url + 'Products/' + id);
  }

  getProductsFromCategory(catName: String): Observable<ProductModelServer[]> {
    return this.http.get<ProductModelServer[]>(this.url + 'Products/Category/' + catName);
  }

}
