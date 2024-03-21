import { createRequest, createResponse } from "node-mocks-http"
import { registerController } from "./register"
import { User } from "../../models/user"
import { userService } from "../../services/user"
import { verifyAccessToken } from "../../utilities/tokens/accessToken";
import { verifyRefreshToken } from "../../utilities/tokens/refreshToken";


const mockedGetUser = jest.spyOn(userService, "getUserByEmailorNumber");
const mockedAddUser = jest.spyOn(userService, "addNewUser");

describe("register controller", () => {
    test("should send 400 response when an account with provided email already exists", async () => {
        const existingUser = { email: "test@domain.com", name: "test", mobileNumber: "4567891230", password: "test123" }

        const req = createRequest({ body: { email: "test@domain.com", name: "test1", mobileNumber: "1234567890", password: "test123" } })
        const res = createResponse()
        const next = jest.fn();

        const userDoc = new User(existingUser)

        mockedGetUser.mockResolvedValueOnce(userDoc)
        mockedGetUser.mockResolvedValueOnce(null)

        await registerController(req, res, next)


        expect(res._getStatusCode()).toBe(400)
        expect(res._getJSONData()).toEqual({ message: "account with email exists" })
    })


    test("should return 400 response when an account with provided mobile number already exists", async () => {
        const existingUser = { email: "another@domain.com", name: "test", mobileNumber: "1234567890", password: "test123" }

        const req = createRequest({ body: { email: "test@domain.com", name: "test1", mobileNumber: existingUser.mobileNumber, password: "test123" } })
        const res = createResponse()
        const next = jest.fn();

        const userDoc = new User(existingUser)

        mockedGetUser.mockResolvedValueOnce(null)
        mockedGetUser.mockResolvedValueOnce(userDoc)

        await registerController(req, res, next)


        expect(res._getStatusCode()).toBe(400)
        expect(res._getJSONData()).toEqual({ message: "account with mobile number exists" })
    })


    test("should send 201 response along with access token cookies when request is valid", async () => {
        const user = { email: "test@domain.com", name: "test", mobileNumber: "1234567890", password: "test123" }

        const req = createRequest({ body: { email: user.email, name: user.name, mobileNumber: user.mobileNumber, password: user.password } })
        const res = createResponse()
        const next = jest.fn();

        const userDoc = new User(user);

        mockedGetUser.mockResolvedValue(null);
        mockedAddUser.mockResolvedValue(userDoc);

        await registerController(req, res, next)


        expect(res._getStatusCode()).toBe(201)

        const { accessToken, refreshToken } = res.cookies

        const accessTokenPayload = await verifyAccessToken(accessToken.value)
        const refreshTokenPayload = await verifyRefreshToken(refreshToken.value)


        expect(accessTokenPayload.valid).toBe(true)
        if (accessTokenPayload.valid === true) expect(accessTokenPayload.payload.email).toBe(user.email)

        expect(refreshTokenPayload.valid).toBe(true)
        if (refreshTokenPayload.valid === true) expect(refreshTokenPayload.payload.email).toBe(user.email)
    })
})