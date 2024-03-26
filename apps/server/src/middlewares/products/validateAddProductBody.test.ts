import { createRequest, createResponse } from "node-mocks-http"
import { IAddProductBody, validateAddProductBody } from "./validateAddProductBody"
import { headphoneTypeEnum } from "../../models/productDetails"

describe("validateAddProductBody middleware", () => {
    test("should return 422 response when fields are missing in request body", () => {
        const req = createRequest()
        const res = createResponse()
        const next = jest.fn();

        const errorObj = {
            message: "Invalid body", errors: {
                name: "name is required", brand: "brand is required",
                price: "price is required", fullTitle: "fullTitle is required", color: "color is required",
                description: "description is required", headphoneType: "headphoneType is required"
            }
        }

        validateAddProductBody(req, res, next)

        expect(res._getStatusCode()).toBe(422)
        expect(res._getJSONData()).toEqual(errorObj)
    })


    test("should return 422 response when name contains only numbers", () => {
        const req = createRequest({
            body: { brand: "osgn", color: "seoniwrg", description: ["soeufn"], fullTitle: "segonrog", headphoneType: "on-ear", price: "909", name: "134" } as IAddProductBody,
            files: { mainImage: "afd", images: "wsf" }
        })
        const res = createResponse()
        const next = jest.fn();

        const errorObj = {
            message: "Invalid body", errors: {
                name: "name should contain atleast 1 letter"
            }
        }

        validateAddProductBody(req, res, next)

        expect(res._getStatusCode()).toBe(422)
        expect(res._getJSONData()).toEqual(errorObj)
    })


    test("should return 422 response when brand contains only numbers", () => {
        const req = createRequest({
            body: { brand: "123", color: "seoniwrg", description: ["soeufn"], fullTitle: "segonrog", headphoneType: "on-ear", price: "909", name: "a134" } as IAddProductBody,
            files: { mainImage: "afd", images: "wsf" }
        })
        const res = createResponse()
        const next = jest.fn();

        const errorObj = {
            message: "Invalid body", errors: {
                brand: "brand should contain atleast 1 letter"
            }
        }

        validateAddProductBody(req, res, next)

        expect(res._getStatusCode()).toBe(422)
        expect(res._getJSONData()).toEqual(errorObj)
    })


    test("should return 422 response when color contains only numbers", () => {
        const req = createRequest({
            body: { brand: "b123", color: "23432423", description: ["soeufn"], fullTitle: "segonrog", headphoneType: "on-ear", price: "909", name: "a134" } as IAddProductBody,
            files: { mainImage: "afd", images: "wsf" }
        })
        const res = createResponse()
        const next = jest.fn();

        const errorObj = {
            message: "Invalid body",
            errors: {
                color: "color should contain atleast 1 letter"
            }
        }

        validateAddProductBody(req, res, next)

        expect(res._getStatusCode()).toBe(422)
        expect(res._getJSONData()).toEqual(errorObj)
    })


    test("should return 422 response when fullTitle contains only numbers", () => {
        const req = createRequest({
            body: { brand: "b123", color: "black", description: ["soeufn"], fullTitle: "324324324", headphoneType: "on-ear", price: "909", name: "a134" } as IAddProductBody,
            files: { mainImage: "afd", images: "wsf" }
        })
        const res = createResponse()
        const next = jest.fn();

        const errorObj = {
            message: "Invalid body",
            errors: {
                fullTitle: "fullTitle should contain atleast 1 letter"
            }
        }

        validateAddProductBody(req, res, next)

        expect(res._getStatusCode()).toBe(422)
        expect(res._getJSONData()).toEqual(errorObj)
    })



    test("should return 422 response when price is non numeric", () => {
        const req = createRequest({
            body: { brand: "b123", color: "black", description: ["soeufn"], fullTitle: "32432a4324", headphoneType: "on-ear", price: "90e9", name: "a134" } as IAddProductBody,
            files: { mainImage: "afd", images: "wsf" }
        })
        const res = createResponse()
        const next = jest.fn();

        const errorObj = {
            message: "Invalid body",
            errors: {
                price: "should contain only numbers"
            }
        }

        validateAddProductBody(req, res, next)

        expect(res._getStatusCode()).toBe(422)
        expect(res._getJSONData()).toEqual(errorObj)
    })



    test("should return 422 response when headphoneType contains invalid value", () => {
        const req = createRequest({
            body: { brand: "b123", color: "black", description: ["soeufn"], fullTitle: "32432a4324", headphoneType: "onear", price: "909", name: "a134" } as IAddProductBody,
            files: { mainImage: "afd", images: "wsf" }
        })
        const res = createResponse()
        const next = jest.fn();

        const errorObj = {
            message: "Invalid body",
            errors: {
                headphoneType: `should be one of the value ${headphoneTypeEnum.join(", ")}`
            }
        }

        validateAddProductBody(req, res, next)

        expect(res._getStatusCode()).toBe(422)
        expect(res._getJSONData()).toEqual(errorObj)
    })


    test("should return 422 response when description is a string", () => {
        const req = createRequest({
            body: { brand: "b123", color: "black", description: "soeufn", fullTitle: "32432a4324", headphoneType: "on-ear", price: "909", name: "a134" },
            files: { mainImage: "afd", images: "wsf" }
        })
        const res = createResponse()
        const next = jest.fn();

        const errorObj = {
            message: "Invalid body",
            errors: {
                description: "description should be an array of string"
            }
        }

        validateAddProductBody(req, res, next)

        expect(res._getStatusCode()).toBe(422)
        expect(res._getJSONData()).toEqual(errorObj)

    })


    test("should return 422 response when description is an empty array", () => {
        const req = createRequest({
            body: { brand: "b123", color: "black", description: [], fullTitle: "32432a4324", headphoneType: "on-ear", price: "909", name: "a134" },
            files: { mainImage: "afd", images: "wsf" }
        })
        const res = createResponse()
        const next = jest.fn();

        const errorObj = {
            message: "Invalid body",
            errors: {
                description: "should have atleast 1 description point"
            }
        }

        validateAddProductBody(req, res, next)

        expect(res._getStatusCode()).toBe(422)
        expect(res._getJSONData()).toEqual(errorObj)

    })


    test("should return 422 response when description point is invalid", () => {
        const req = createRequest({
            body: { brand: "b123", color: "black", description: ["  "], fullTitle: "32432a4324", headphoneType: "on-ear", price: "909", name: "a134" },
            files: { mainImage: "afd", images: "wsf" }
        })
        const res = createResponse()
        const next = jest.fn();

        const errorObj = {
            message: "Invalid body",
            errors: {
                description: "descrption point cannot be empty string"
            }
        }

        validateAddProductBody(req, res, next)

        expect(res._getStatusCode()).toBe(422)
        expect(res._getJSONData()).toEqual(errorObj)

    })
})