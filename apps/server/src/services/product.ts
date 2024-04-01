import { Types } from "mongoose";
import { IAddProductBody } from "../middlewares/products/validateAddProductBody";
import { ProductDetails } from "../models/productDetails";
import { ProductReview } from "../models/productReview";


interface IProductQuery {
    name?: string
    color?: string
    headphoneType?: string
    company?: string
    sortBy: string
    orderBy: "asc" | "desc"

    price: {
        gt: string
        lt: string
    } | undefined
}


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


    async getProducts(query: IProductQuery) {

        const sortQuery = query.sortBy ? { [query.sortBy]: query.orderBy } : {}

        // add's price filter options only if provided else undefined
        const price = query.price ? { price: { $gt: query.price.gt, $lt: query.price.lt } } : undefined

        const productsList = await ProductDetails.find({
            color: { $regex: query.color, $options: "i" },
            brand: { $regex: query.company, $options: "i" },
            name: { $regex: query.name, $options: "i" },
            headphone_type: { $regex: query.headphoneType, $options: "i" },
            ...price
        })
            .collation({ locale: "en", caseLevel: true })
            .sort(sortQuery)
            .populate({ path: "review", select: ["rating", "total_customer_reviews"] });

        return productsList
    }


    async getProductById(id: string) {
        return await ProductDetails.findById(id)
    }


    async getProductsFromIdArray(idArray: Types.ObjectId[]) {
        return await ProductDetails.find({
            _id: {
                $in: idArray
            }
        })
    }
}



export const productService = new ProductService()