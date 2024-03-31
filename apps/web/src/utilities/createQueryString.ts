import { IProductQueryData } from "@web/store/slices/productQuery";

export const createQueryString = (value: IProductQueryData["queryOptions"]) => {

    const object = {
        ...value,
        order: ""
    }


    switch (value.sortBy) {
        case ("price_asc"):
            object.sortBy = "price"
            object.order = "asc"
            break;

        case ("price_desc"):
            object.sortBy = "price"
            object.order = "desc"
            break;

        case ("name_asc"):
            object.sortBy = "name"
            object.order = "asc"
            break;

        case ("name_desc"):
            object.sortBy = "name"
            object.order = "desc"
            break;

        default:
            object.sortBy = ""
            object.order = ""
    }

    const urlParam = new URLSearchParams();

    Object.keys(object).map(key => {

        const value = object[key as keyof typeof object]
        if (value && value.toLowerCase() !== "featured") urlParam.append(key, value)
    })

    return urlParam.toString()
}