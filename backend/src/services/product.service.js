import { ProductModel } from "../models/Product.model.js";

class ProductService {
    // == Получение списка продуктов ==
    async getProducts() {
        const products = await ProductModel.find();
        return products;
    }

    // == получение продукта по идентификатору ==
    async getProductById(id) {
        const product = await ProductModel.findById(id);
        return product;
    }

    // == создание продукта  ==
    async createProduct({ thumbnail, title, description, price, sizes }) {
        const product = await ProductModel.create({
            thumbnail,
            title,
            description,
            price,
            sizes,
        }).then(p => p.toObject());

        return product;
    }
};

export const productService = new ProductService();