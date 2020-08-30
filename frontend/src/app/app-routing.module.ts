import { CustumerComponent } from './components/custumer/custumer.component';
import { ThankyouComponent } from './components/thankyou/thankyou.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductComponent } from './components/product/product.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';


const routes: Routes = [
  {
    path:'',component:HomeComponent
  },
  {
    path:'product/:id',component:ProductComponent
  },
  {
    path:'cart',component:CartComponent
  },
  {
    path:'checkout',component:CheckoutComponent
  },
  {
    path:'thankyou',component:ThankyouComponent
  },
  {
    path:'customer/:id',component:CustumerComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
