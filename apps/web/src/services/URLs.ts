export const apiURLs = {
    loginURL: "/api/user/login",
    registerURL: "/api/user/register",
    getUserInfo: "/api/user/info",

    // products
    addProduct: "/api/product",
    getProducts: "/api/product",

    addToCart: "/api/cart",
    getCart: "/api/cart",

    placeOrder: "/api/orders",
    getOrderList: "/api/orders",
    getOrder: (id: string) => "/api/orders/" + id,

    addfeedback: "/api/feedback"
}