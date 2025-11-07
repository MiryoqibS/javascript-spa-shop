import { ApiError } from "../errors/ApiError";
import { productService } from "../services/product.service";

class ProductController {
    // ==  ==
    async getProducts(req, res, next) {
        try {
            const products = await productService.getProducts();
            return res.json({
                success: true,
                products,
            });
        } catch (error) {
            next(error);
        }
    } 

    // ==  ==
    async getProductById(req, res, next) {
        try {
            const id = req.params.id;
            if (!id) throw ApiError.BaqRequestError("идентификатор не передан");
            const product = await productService.getProductById(id);
            return res.json({
                success: true,
                product,
            });
        } catch (error) {
            next(error);
        }
    }

    // ==  ==
    async addProduct(req, res, next) {
        try {
            const product = await productService.createProduct(req.body);
        } catch (error) {
            next(error);
        }
    }
}

export const productController = new ProductController();