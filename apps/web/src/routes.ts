export const route = {
    users: {
        index: "/user",

        get login() { return this.index + "/login" },

        get register() { return this.index + "/register" }
    }
}