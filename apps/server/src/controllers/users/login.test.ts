import { createRequest, createResponse } from "node-mocks-http"
import { loginController } from "./login"
import { userService } from "../../services/user"
import { IUser, User } from "../../models/user"

const mockedGetUser = jest.spyOn(userService, "getUserByEmailorNumber")

describe("login controller", () => {
    test("should send 400 response when user data doesn't exist in db", async () => {
        const req = createRequest({ body: { identifier: "test@domain.com", password: "Hello" } })
        const res = createResponse();
        const next = jest.fn();

        mockedGetUser.mockResolvedValue(null)

        await loginController(req, res, next)

        expect(res._getStatusCode()).toBe(400)
        expect(res._getJSONData()).toEqual({ message: "user doesn't exist" })
    })


    test("should send 400 response when password donot match", async () => {
        const user: IUser = { email: "test@domain.com", mobile_number: "1232543534", name: "test", password: "test123" }

        const req = createRequest({ body: { identifier: user.email, password: "wrongpassword" } })
        const res = createResponse();
        const next = jest.fn();

        const userDoc = new User(user)

        mockedGetUser.mockResolvedValue(userDoc)

        await loginController(req, res, next)

        expect(res._getStatusCode()).toBe(400);
        expect(res._getJSONData()).toEqual({ message: "password doesnot match" });
    })



})