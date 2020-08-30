import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  produtos: any[] = [];

  constructor(private ProductService: ProductService,
    private router: Router) { }


  ngOnInit(): void {
    this.ProductService.getAllProducts().subscribe((prods:{size:Number,artigos:any[]})=>{
      this.produtos = prods.artigos;
    });


  }

  selectProduct(id:Number){
    this.router.navigate(['/product',id]).then();
  }
}
