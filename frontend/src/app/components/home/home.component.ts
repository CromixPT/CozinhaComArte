import { CartService } from './../../services/cart.service';
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
    private cartService:CartService,
    private router: Router) { }


  ngOnInit(): void {
    this.ProductService.getAllProducts().subscribe((prods:ServerResponse)=>{
      console.log(prods.Products)
      this.produtos = prods.Products;
    });


  }

  selectProduct(id:number){
    this.router.navigate(['/product',id]).then();
  }

  AddToCart(id:number){
    console.log(id);
    this.cartService.AddProductTocart(id);
  }
}
