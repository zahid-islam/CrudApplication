import { Injectable } from '@angular/core';
import { Product } from './product.model';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { map } from 'rxjs/operators';
import { Category } from './category.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productList: Product[];
  categoryList: Category[];
  selectedProduct: Product
  constructor(private http: Http) { }

  postProduct(product: Product) {
    debugger
    var body = JSON.stringify(product);
    var headeOptions = new Headers({ 'Content-Type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headeOptions });
    return this.http.post('http://localhost:53321/api/Products', body, requestOptions)
    .pipe(map(x => x.json()));
    //.pipe(map((response: any) => response.json()));
  }

  putProduct(id, product : Product) {
    var body = JSON.stringify(product);
    var headeOptions = new Headers({ 'Content-Type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Put, headers: headeOptions });
    return this.http.post('http://localhost:53321/api/Products/' + id,
      body,
      requestOptions).pipe(map(x => x.json()));
  }

  getProductList() {
    this.http.get('http://localhost:53321/api/Products')
      .pipe(map((data: Response) => {
        return data.json() as Product[];
      })).toPromise().then(x => {
        this.productList = x;
      })
  }
  getCategoryList() {
    this.http.get('http://localhost:53321/api/Categories')
      .pipe(map((data: Response) => {
        return data.json() as Category[];
      })).toPromise().then(x => {
        this.categoryList = x;
      })
  }

  deleteProduct(id : number){
    return this.http.delete('http://localhost:53321/api/Products/' + id)
    .pipe(map(res => res.json()));
  }
}
