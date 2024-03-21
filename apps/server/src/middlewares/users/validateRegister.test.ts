import { createRequest, createResponse } from "node-mocks-http"
import { validateRegisterBody } from "./validateRegister";

describe("validateRegisterBody middleware", () => {
    test("should send 422 response when no fields are present in request body", () => {
        const req = createRequest();
        const res = createResponse();
        const next = jest.fn();

        const errorObj = { message: "Invalid body", errors: { email: "email is required", name: "name is required", mobileNumber: "mobile number is required", password: "password is required" } }

        validateRegisterBody(req, res, next)

        expect(res._getStatusCode()).toBe(422)
        expect(res._getJSONData()).toEqual(errorObj)
    })


    test("should send 422 response when invalid email is sent", () => {
        const req = createRequest({ body: { email: "hello", name: "hello", mobileNumber: "1234567890", password: "Password@1" } });
        const res = createResponse();
        const next = jest.fn();

        const errorObj = { message: "Invalid body", errors: { email: "email is invalid" } }

        validateRegisterBody(req, res, next)

        expect(res._getStatusCode()).toBe(422)
        expect(res._getJSONData()).toEqual(errorObj)
    })


    test("should send 422 response when name is invalid", () => {
        const req = createRequest({ body: { email: "test@domain.com", name: "453", mobileNumber: "1234567890", password: "Password@1" } });
        const res = createResponse();
        const next = jest.fn();

        const errorObj = { message: "Invalid body", errors: { name: "name should contain atleast 1 letter" } }

        validateRegisterBody(req, res, next)

        expect(res._getStatusCode()).toBe(422)
        expect(res._getJSONData()).toEqual(errorObj)
    })


    test("should send 422 response when mobile number is invalid", () => {
        const req = createRequest({ body: { email: "test@domain.com", name: "test1", mobileNumber: "1a2345678", password: "Password@1" } });
        const res = createResponse();
        const next = jest.fn();

        const errorObj = { message: "Invalid body", errors: { mobileNumber: "should contain only numbers" } }

        validateRegisterBody(req, res, next)

        expect(res._getStatusCode()).toBe(422)
        expect(res._getJSONData()).toEqual(errorObj)
    })



    test("should send 422 response when password is short", () => {
        const req = createRequest({ body: { email: "test@domain.com", name: "test1", mobileNumber: "12345678", password: "123" } });
        const res = createResponse();
        const next = jest.fn();

        const errorObj = { message: "Invalid body", errors: { password: "must be 8 letters long" } }

        validateRegisterBody(req, res, next)

        expect(res._getStatusCode()).toBe(422)
        expect(res._getJSONData()).toEqual(errorObj)
    })


    test("should send 422 response when password contains only numbers", () => {
        const req = createRequest({ body: { email: "test@domain.com", name: "test1", mobileNumber: "12345678", password: "12345678" } });
        const res = createResponse();
        const next = jest.fn();

        const errorObj = { message: "Invalid body", errors: { password: "must contain atleast 1 number, 1 upper case letter and 1 special symbol" } }

        validateRegisterBody(req, res, next)

        expect(res._getStatusCode()).toBe(422)
        expect(res._getJSONData()).toEqual(errorObj)
    })


    test("should send 422 response when password doesnot contain upper case letter", () => {
        const req = createRequest({ body: { email: "test@domain.com", name: "test1", mobileNumber: "12345678", password: "password123" } });
        const res = createResponse();
        const next = jest.fn();

        const errorObj = { message: "Invalid body", errors: { password: "must contain atleast 1 number, 1 upper case letter and 1 special symbol" } }

        validateRegisterBody(req, res, next)

        expect(res._getStatusCode()).toBe(422)
        expect(res._getJSONData()).toEqual(errorObj)
    })


    test("should send 422 response when password doesnot contain any special symbol", () => {
        const req = createRequest({ body: { email: "test@domain.com", name: "test1", mobileNumber: "12345678", password: "Password123" } });
        const res = createResponse();
        const next = jest.fn();

        const errorObj = { message: "Invalid body", errors: { password: "must contain atleast 1 number, 1 upper case letter and 1 special symbol" } }

        validateRegisterBody(req, res, next)

        expect(res._getStatusCode()).toBe(422)
        expect(res._getJSONData()).toEqual(errorObj)
    })


    test("should call next without any arguments when request body is valid", () => {
        const req = createRequest({ body: { email: "test@domain.com", name: "test1", mobileNumber: "12345678", password: "Password@123" } });
        const res = createResponse();
        const next = jest.fn();

        validateRegisterBody(req, res, next)

        expect(next).toHaveBeenCalledTimes(1)
        expect(next).toHaveBeenCalledWith()
    })
})