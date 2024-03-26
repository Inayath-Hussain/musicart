import { IAddProductBody } from "../middlewares/products/validateAddProductBody";
import { ProductDetails } from "../models/productDetails";
import { ProductReview } from "../models/productReview";

class ProductService {
    async addProduct({ brand, color, description, fullTitle, name, price, headphoneType }: IAddProductBody, main_image_url: string, imagesURL: string[]) {
        const productDoc = new ProductDetails({
            brand,
            name,
            color,
            description,
            price,
            full_title: fullTitle,
            main_image: main_image_url,
            other_images: imagesURL,
            headphone_type: headphoneType
        })


        await productDoc.save();

        const reviewDoc = new ProductReview({
            rating: Math.round(Math.random() * 5),
            total_customer_reviews: Math.round(Math.random() * 100),
            product_id: productDoc._id
        })

        await reviewDoc.save()
    }
}



export const productService = new ProductService()