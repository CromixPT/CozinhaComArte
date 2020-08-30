import { ProductModelServer, ServerResponse } from './../../models/product.model';
import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  produtos: ProductModelServer[] = [];

  constructor(private ProductService: ProductService,
    private router: Router) { }


  ngOnInit(): void {
    this.ProductService.getAllProducts().subscribe((prods:ServerResponse)=>{
      this.produtos = prods.artigos;
    });


  }

  selectProduct(id:number){
    this.router.navigate(['/product',id]).then();
  }
}
