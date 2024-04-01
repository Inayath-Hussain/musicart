import { RequestHandler } from "express";
import { productService } from "../../services/product";
import { IProductDetails } from "../../models/productDetails";
// import { IProductDetails } from "../../models/productDetails";


interface ISort {
    sortBy: keyof IProductDetails | ""
    orderBy: "asc" | "desc"
}


// function to validate and extract sort query values
const extractSortValues = (sortBy: any, orderBy: any) => {
    const result: ISort = {
        sortBy: "",
        orderBy: "asc"
    }

    if (typeof sortBy !== "string") return result

    switch (sortBy.toLowerCase()) {
        case ("price"):
            result.sortBy = "price"
            break;

        case ("name"):
            result.sortBy = "name"
            break;
    }

    if (typeof orderBy !== 'string') return result

    switch (orderBy.toLowerCase()) {
        case ("asc"):
            result.orderBy = "asc"
            break;

        case ("desc"):
            result.orderBy = "desc"
            break;
    }

    return result
}



// function to extract price range values
const parsePriceRange = (value: any) => {
    const result = {
        gt: "",
        lt: ""
    }

    if (typeof value !== "string") return undefined

    const [gt, lt] = value.split("-")

    result.gt = gt.trim()
    result.lt = lt.trim()

    if (result.gt === "" || result.lt === "") return undefined

    return result
}




export const getProductsController: RequestHandler = async (req, res, next) => {

    // filter queries
    const color = typeof req.query.color === "string" ? req.query.color : ""
    const company = typeof req.query.company === "string" ? req.query.company : ""
    const name = typeof req.query.name === "string" ? req.query.name : ""
    const headphoneType = typeof req.query.headphoneType === "string" ? req.query.headphoneType : ""

    // sort query
    const { sortBy, orderBy } = extractSortValues(req.query.sortBy, req.query.order)

    // price range filter query
    const price = parsePriceRange(req.query.price)


    const data = await productService.getProducts({ color, company, name, headphoneType, sortBy, orderBy, price });

    return res.status(200).json({ data })
}

