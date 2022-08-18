import { Injectable, NotFoundException } from "@nestjs/common";
import { Product } from "./products.model";

@Injectable()
export class ProductService{
    private products: Product[] = [];

    insertProduct(title: string, desc: string, price: number){
        const prodId = Math.random().toString();
        const newProduct = new Product(prodId, title, desc, price);
        this.products.push(newProduct);
        return prodId;
    }

    getProducts(){
        return [...this.products]; 
    }

    getProduct(prodId: string){
        const productObj = this.findProdcut(prodId)
        return {... productObj.product};
    }

    updateProduct(prodId: string, body: any){
        const productObj = this.findProdcut(prodId)
        if(productObj.product){
            this.products[productObj.index] = {...productObj.product, ...body}
        }
        return    
    }

    deleteProduct(prodId: string){
        const productObj = this.findProdcut(prodId)
        if(productObj.product){
            this.products.splice(productObj.index, 1)   
        }
        return    
    }

    private findProdcut(id: string) : any {
        const productIndex = this.products.findIndex(prod=> prod.id === id);
        const product = this.products[productIndex]
        if(!product){
            throw new NotFoundException('Not found !');
        }
        else{
            return {
                index: productIndex,
                product: product
            };
        }  
    }
}