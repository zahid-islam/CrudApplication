import { Category } from './../shared/category.model';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../shared/product.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  categoryList: Category[] = [
    {
      "Id": 1,
      "CategoryName": "Baby Food"
    },
    {
      "Id": 2,
      "CategoryName": "Grocery"
    }
  ];

  constructor(private productService: ProductService, private toastr: ToastrService) { }

  ngOnInit() {
    this.resetForm()
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.reset();
    this.productService.selectedProduct = {
      Id: 0,
      ProductName: '',
      CategoryId: null,
      CreateDate: null
    }
  }

  onSubmit(form: NgForm) {
    debugger
    if (form.value.Id == 0 && form.value.ProductName != null && form.value.CategoryId != null) {
      this.productService.postProduct(form.value)
        .subscribe(data => {
          this.resetForm(form);
          this.productService.getProductList();
          this.toastr.success('New record added successfully', 'Product Entry');
        });
    }
    else {
      this.productService.putProduct(form.value.Id, form.value)
        .subscribe(data => {
          this.resetForm(form);
          this.productService.getProductList();
          this.toastr.info('Record updated successfully!', 'Product Entry');
        });
    }
  }

}
