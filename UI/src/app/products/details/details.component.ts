import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  product: Product = new Product();

  constructor(private productService: ProductService, private route: ActivatedRoute) { }

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

}
