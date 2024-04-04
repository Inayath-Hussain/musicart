export const route = {
    users: {
        index: "/user",

        get login() { return this.index + "/login" },

        get register() { return this.index + "/register" }
    },

    home: "/",

    cart: "/cart",

    checkout: "/checkout",

    invoices: {
        index: "/invoices",
        id: function (order_id: string) { return this.index + "/" + order_id },
    },

    products: {
        index: "/products",

        get addNew() { return this.index + "/add-new" },

        detail(id: string) { return this.index + "/" + id }
    }
}