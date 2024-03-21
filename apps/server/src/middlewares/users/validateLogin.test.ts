import { createRequest, createResponse } from "node-mocks-http"
import { validateLoginBody } from "./validateLogin";

describe("validateLogin middleware", () => {
    test("should send 422 response when request body doesn't contain any field", () => {
        const req = createRequest();
        const res = createResponse();
        const next = jest.fn();

        const errorObj = { message: "Invalid body", errors: { identifier: "email or mobile number is required", password: "password is required" } }

        validateLoginBody(req, res, next)

        expect(res._getStatusCode()).toBe(422)
        expect(res._getJSONData()).toEqual(errorObj)
    })


    test("should send 422 response when only identifier is missing", () => {
        const req = createRequest({ body: { password: "Hellowogn@13" } });
        const res = createResponse();
        const next = jest.fn();

        const errorObj = { message: "Invalid body", errors: { identifier: "email or mobile number is required" } }

        validateLoginBody(req, res, next)

        expect(res._getStatusCode()).toBe(422)
        expect(res._getJSONData()).toEqual(errorObj)
    })


    test("should send 422 response when identifier is neither email nor mobile number", () => {
        const req = createRequest({ body: { identifier: "Hello", password: "Hellowogn@13" } });
        const res = createResponse();
        const next = jest.fn();

        const errorObj = { message: "Invalid body", errors: { identifier: "must be either a email or mobile number" } }

        validateLoginBody(req, res, next)

        expect(res._getStatusCode()).toBe(422)
        expect(res._getJSONData()).toEqual(errorObj)
    })


    test("should send 422 response when password is missing in request body", () => {
        const req = createRequest({ body: { identifier: "test@domain.com" } });
        const res = createResponse();
        const next = jest.fn();

        const errorObj = { message: "Invalid body", errors: { password: "password is required" } }

        validateLoginBody(req, res, next)

        expect(res._getStatusCode()).toBe(422)
        expect(res._getJSONData()).toEqual(errorObj)
    })


    test("should call next when a valid email is sent as identifier", () => {
        const req = createRequest({ body: { identifier: "test@domain.com", password: "Hello" } });
        const res = createResponse();
        const next = jest.fn();

        validateLoginBody(req, res, next)

        expect(next).toHaveBeenCalledTimes(1)
        expect(next).toHaveBeenCalledWith()
    })


    test("should call next when a valid mobile number is sent as identifier", () => {
        const req = createRequest({ body: { identifier: "1234567890", password: "Hello" } });
        const res = createResponse();
        const next = jest.fn();

        validateLoginBody(req, res, next)

        expect(next).toHaveBeenCalledTimes(1)
        expect(next).toHaveBeenCalledWith()
    })

})