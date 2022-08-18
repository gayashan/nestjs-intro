import { Controller, Post, Body, Get, Param, Patch, Delete } from "@nestjs/common";
import { ProductService } from "./products.service";

@Controller('products')
export class ProductsController {
    constructor(private readonly productService: ProductService){}

    @Post()
    addProduct(@Body('title') prodTitle: string, @Body('description') prodDesc: string, @Body('price') prodPrice: number) : any{
        const generatedId = this.productService.insertProduct(prodTitle, prodDesc, prodPrice);
        return {id: generatedId};
    }

    @Get()
    getAllProducts() : any{
        return this.productService.getProducts();
    }

    @Get(':id')
    getProduct(@Param('id') prodId: string) : any{
        return this.productService.getProduct(prodId);
    }

    @Patch(':id')
    updateProduct(@Param('id') prodId: string, @Body() body) : any{
        return this.productService.updateProduct(prodId, body);  
    }

    @Delete(':id')
    deleteProduct(@Param('id') prodId: string) : any{
        return this.productService.deleteProduct(prodId);  
    }
}