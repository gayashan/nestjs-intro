import { Controller, Post, Body, Get, Param, Patch, Delete } from "@nestjs/common";
import { ProductService } from "./products.service";

@Controller('products')
export class ProductsController {
    constructor(private readonly productService: ProductService){}

    @Post()
    async addProduct(@Body('title') prodTitle: string, @Body('description') prodDesc: string, @Body('price') prodPrice: number) {
        const generatedId = await this.productService.insertProduct(prodTitle, prodDesc, prodPrice);
        return {id: generatedId};
    }

    @Get()
    async getAllProducts() {
        return await this.productService.getProducts();
    }

    @Get(':id')
    async getProduct(@Param('id') prodId: string) {
        return await this.productService.getProduct(prodId);
    }

    @Patch(':id')
    async updateProduct(@Param('id') prodId: string, @Body() body) {
        return await this.productService.updateProduct(prodId, body);  
    }

    @Delete(':id')
    async deleteProduct(@Param('id') prodId: string) {
        return await this.productService.deleteProduct(prodId);  
    }
}