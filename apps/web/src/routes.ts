export const route = {
    users: {
        index: "/user",

        get login() { return this.index + "/login" },

        get register() { return this.index + "/register" }
    },

    home: "/",

    products: {
        index: "/products",

        get addNew() { return this.index + "/add-new" }
    }
}