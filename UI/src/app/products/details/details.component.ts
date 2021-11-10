import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  product: Product = new Product();

  constructor(private productService: ProductService,
    private route: ActivatedRoute,
    private cartService: CartService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.showProductDetails();
    });
  }

  showProductDetails() {
    const strProdId = this.route.snapshot.paramMap.get('id');
    let ProdId = 0;
    if (!strProdId) {
      ProdId = 0;
    }
    else {
      ProdId = Number.parseInt(strProdId);
    }
    this.productService.getProductData(ProdId).subscribe(data => this.product = data);
  }

  addToCart() {
    console.log(`Adding to Cart: ${this.product.name}, ${this.product.unitPrice}`);

    const theCartItem = new CartItem();
    theCartItem.addProduct(this.product);

    this.cartService.addToCart(theCartItem);
  }

}
