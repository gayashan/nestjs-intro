import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { title } from "process";
import { Product } from "./products.model";

@Injectable()
export class ProductService{
    private products: Product[] = [];

    constructor(@InjectModel('Product') private readonly productModel: Model<Product>, ){}

    async insertProduct(title: string, desc: string, price: number){
        // const prodId = Math.random().toString();
        const newProduct = new this.productModel({
            title,
            description: desc,
            price,
        });
        const result = await newProduct.save();
        console.log(result)
        return result.id as string;
    }

    async getProducts(){
        const products = await this.productModel.find().exec();
        return products.map(prod=>({id: prod.id, title: prod.title, description: prod.description, price: prod.price })); 
    }

    async getProduct(prodId: string){
        const productObj = await this.findProdcut(prodId)
        return {id: productObj.id, title: productObj.title, description: productObj.description, price: productObj.price };
    }

    async updateProduct(prodId: string, body: any){
        let productObj = await this.findProdcut(prodId);
        // if(productObj){
        //     productObj = {...productObj, ...body}
        // }
        if(body.title)
            productObj.title = body.title;
        if(body.description)
            productObj.description = body.description;
        if(body.price)
            productObj.price = body.price;
        productObj.save();
        return    
    }

    async deleteProduct(prodId: string){
        const result = await this.productModel.deleteOne({id: prodId}).exec();
        console.log(result)
        if(result.deletedCount === 0){
            throw new NotFoundException('Not found !');
        }
    }

    private async findProdcut(id: string) : Promise<Product> {
        let product
        try {
            product = await this.productModel.findById(id);    
        } catch (error) {
            throw new NotFoundException('Not found !');
        }

        if(!product){
            throw new NotFoundException('Not found !');
        }
        else{
            return product;
        }  
    }
}