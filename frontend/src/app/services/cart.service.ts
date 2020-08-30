import {Injectable} from '@angular/core';
import {ProductService} from "./product.service";
import {BehaviorSubject} from "rxjs";
import {CartModelPublic, CartModelServer} from "../models/cart.model";
import {ProductModelServer} from "../models/product.model";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {NavigationExtras, Router} from "@angular/router";
import {OrderService} from "./order.service";
import {NgxSpinnerService} from "ngx-spinner";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private serverURL = environment.serverURL;

  //Variável para armazenar informação do cart no armazenamento local
  private cartDataClient: CartModelPublic= {
    total: 0,
    prodData: [{
      incart: 0,
      id: 0
    }]
  };

  //Variável para armazenar informação do cart no Angular
  private cartDataServer: CartModelServer = {
    total: 0,
    data: [{
      numInCart:0,
      product: undefined
    }]
  };

  //Observáveis para os componentes subscreverem
  cartTotal$ = new BehaviorSubject<number>(0);
  cartData$ = new BehaviorSubject<CartModelServer>(this.cartDataServer);


  constructor(private productService: ProductService,
              private orderService: OrderService,
              private httpClient: HttpClient,
              private router: Router,
              private spinner: NgxSpinnerService,
              private toast: ToastrService) {

    this.cartTotal$.next((this.cartDataServer.total));
    this.cartData$.next(this.cartDataServer);

    //Recuperar informação do localStorage

    let info: CartModelPublic = JSON.parse(localStorage.getItem('cart'));

    //Verificar se a variável está vazia

    if(info!= null && info != undefined && info.prodData){

      this.cartDataClient = info;

      this.cartDataClient.prodData.forEach(p => {
        this.productService.getSingleProduct(p.id).subscribe((actualProductInfo: ProductModelServer)=>{
          if(this.cartDataServer.data[0].numInCart==0){
            this.cartDataServer.data[0].numInCart = p.incart;
            this.cartDataServer.data[0].product = actualProductInfo;

            //TODO Create CalculateTotal function

            this.cartDataClient.total = this.cartDataServer.total;

            localStorage.setItem('cart', JSON.stringify(this.cartDataClient));

          }else {
            this.cartDataServer.data.push({
              numInCart: p.incart,
              product: actualProductInfo
            });
            //TODO Create CalculateTotal function

            this.cartDataClient.total = this.cartDataServer.total;

            localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
          }

          this.cartData$.next({... this.cartDataServer});

        })
      })

    }

  }


  AddProductTocart(id:number, quantity?: number ){

    this.productService.getSingleProduct(id).subscribe(prod => {
      if(this.cartDataServer.data[0].product == undefined){
      this.cartDataServer.data[0].product = prod;
      this.cartDataServer.data[0].numInCart = quantity!=undefined?quantity : 1;

      //TODO: CALCULATE TOTAL

        this.cartDataClient.prodData[0].incart=this.cartDataServer.data[0].numInCart;
        this.cartDataClient.prodData[0].id = prod.id;
        this.cartDataClient.total = this.cartDataServer.total;
        localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
        this.cartData$.next({...this.cartDataServer});
        //TODO: DISPLAY TOAST NOTIFICATION

    }else {
        let index = this.cartDataServer.data.findIndex(p => p.product.id == prod.id);

        //index positivo -> está no carrinho
        if(index !=-1){
          if (quantity != undefined && quantity <= prod.quantity){
            this.cartDataServer.data[index].numInCart = this.cartDataServer.data[index].numInCart<prod.quantity?quantity: prod.quantity;
          } else {
            this.cartDataServer.data[index].numInCart = this.cartDataServer.data[index].numInCart<prod.quantity?this.cartDataServer.data[index].numInCart++: prod.quantity;
          }

          this.cartDataClient.prodData[index].incart = this.cartDataServer.data[index].numInCart;
          //TODO: DISPLAY TOAST NOTIFICATION

        } else {
          this.cartDataServer.data.push({
            numInCart: 1,
            product: prod
          });

          this.cartDataClient.prodData.push({
            incart: 1,
            id: prod.id
          });

          //TODO: DISPLAY TOAST NOTIFICATION

          //TODO: Calculate total

          this.cartDataClient.total = this.cartDataServer.total;
          localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
          this.cartData$.next({...this.cartDataServer});
        }
      }
   });

  }

  UpdateCartData(index, increase: Boolean) {
    let data = this.cartDataServer.data[index];
    if (increase) {
      // @ts-ignore
      data.numInCart < data.product.quantity ? data.numInCart++ : data.product.quantity;
      this.cartDataClient.prodData[index].incart = data.numInCart;
      this.CalculateTotal();
      this.cartDataClient.total = this.cartDataServer.total;
      this.cartData$.next({...this.cartDataServer});
      localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
    } else {
      // @ts-ignore
      data.numInCart--;

      // @ts-ignore
      if (data.numInCart < 1) {
        this.DeleteProductFromCart(index);
        this.cartData$.next({...this.cartDataServer});
      } else {
        // @ts-ignore
        this.cartData$.next({...this.cartDataServer});
        this.cartDataClient.prodData[index].incart = data.numInCart;
        this.CalculateTotal();
        this.cartDataClient.total = this.cartDataServer.total;
        localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
      }

    }

  }

  DeleteProductFromCart(index) {
    /*    console.log(this.cartDataClient.prodData[index].prodId);
        console.log(this.cartDataServer.data[index].product.id);*/

    if (window.confirm('Are you sure you want to delete the item?')) {
      this.cartDataServer.data.splice(index, 1);
      this.cartDataClient.prodData.splice(index, 1);
      this.CalculateTotal();
      this.cartDataClient.total = this.cartDataServer.total;

      if (this.cartDataClient.total === 0) {
        this.cartDataClient = {prodData: [{incart: 0, id: 0}], total: 0};
        localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
      } else {
        localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
      }

      if (this.cartDataServer.total === 0) {
        this.cartDataServer = {
          data: [{
            product: undefined,
            numInCart: 0
          }],
          total: 0
        };
        this.cartData$.next({...this.cartDataServer});
      } else {
        this.cartData$.next({...this.cartDataServer});
      }
    }
    // If the user doesn't want to delete the product, hits the CANCEL button
    else {
      return;
    }


  }

  CheckoutFromCart(userId: Number) {

    this.httpClient.post(`${this.serverURL}orders/payment`, null).subscribe((res: { success: Boolean }) => {
      console.clear();

      if (res.success) {


        this.resetServerData();
        this.httpClient.post(`${this.serverURL}orders/new`, {
          userId: userId,
          products: this.cartDataClient.prodData
        }).subscribe((data: OrderConfirmationResponse) => {

          this.orderService.getSingleOrder(data.order_id).then(prods => {
            if (data.success) {
              const navigationExtras: NavigationExtras = {
                state: {
                  message: data.message,
                  products: prods,
                  orderId: data.order_id,
                  total: this.cartDataClient.total
                }
              };
              this.spinner.hide();
              this.router.navigate(['/thankyou'], navigationExtras).then(p => {
                this.cartDataClient = {prodData: [{incart: 0, id: 0}], total: 0};
                this.cartTotal$.next(0);
                localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
              });
            }
          });

        })
      } else {
        this.spinner.hide();
        this.router.navigateByUrl('/checkout').then();
        this.toast.error(`Sorry, failed to book the order`, "Order Status", {
          timeOut: 1500,
          progressBar: true,
          progressAnimation: 'increasing',
          positionClass: 'toast-top-right'
        })
      }
    })
  }


  private CalculateTotal() {
    let Total = 0;

    this.cartDataServer.data.forEach(p => {
      const {numInCart} = p;
      const {price} = p.product;
      // @ts-ignore
      Total += numInCart * price;
    });
    this.cartDataServer.total = Total;
    this.cartTotal$.next(this.cartDataServer.total);
  }

  private resetServerData() {
    this.cartDataServer = {
      data: [{
        product: undefined,
        numInCart: 0
      }],
      total: 0
    };
    this.cartData$.next({...this.cartDataServer});
  }

}

interface OrderConfirmationResponse {
  order_id: number;
  success: Boolean;
  message: String;
  products: [{
    id: String,
    numInCart: String
  }]
}
