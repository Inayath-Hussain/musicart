export const route = {
    users: {
        index: "/user",

        get login() { return this.index + "/login" },

        get register() { return this.index + "/register" }
    },

    home: "/",

    cart: "/cart",

    checkout: "/checkout",

    invoices: "/invoices",

    products: {
        index: "/products",

        get addNew() { return this.index + "/add-new" },

        detail(id: string) { return this.index + "/" + id }
    }
}