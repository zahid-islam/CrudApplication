import { Component, OnInit } from '@angular/core';
import { ProductService } from '../shared/product.service';
import { Product } from '../shared/product.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  constructor(private productService : ProductService, private toastr: ToastrService) { }

  ngOnInit() {
    this.productService.getProductList();
  }

  showForEdit(product: Product) {
    this.productService.selectedProduct = Object.assign({}, product);
  }

  onDelete(id: number) {
    if(confirm('Are you sure to delete this record ?') == true)
    {
      this.productService.deleteProduct(id)
      .subscribe(x =>{
        this.productService.getProductList();
        this.toastr.warning("Deletd successfully", "Product Entry");
      });
    }
  }

}
