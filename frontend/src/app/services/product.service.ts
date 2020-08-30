import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  SERVER_URL = environment.SERVER_URL;
  constructor(private http:HttpClient) { }

  getAllProducts(numberOfResult = 10){
    return this.http.get(this.SERVER_URL+'/artigos',{
      params:{
        limit: numberOfResult.toString()
      }
    });
  }


}
