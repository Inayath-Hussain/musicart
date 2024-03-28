import { Fragment, useEffect, useState } from "react";
import { z } from "zod";

import AddLogo from "@web/assets/icons/add_logo.svg";
import DeleteLogo from "@web/assets/icons/delete_logo.svg";
import FormInput, { FormInputProps } from "@web/components/Users/FormInput";
import FormError from "@web/components/Users/FormError";

import styles from "./AddProduct.module.css";
import FormButton from "@web/components/Users/FormButton";
import { AddProductBodyError, addProductService } from "@web/services/product/addProduct";
import { useAbortController } from "@web/hooks/useAbortController";
import { ApiError } from "@web/services/errors";
import { CanceledError } from "axios";
import { useOnline } from "@web/hooks/useOnline";


/**
 * Page used to add products to db. Only admin user's can add products
 */
const AddProductPage = () => {

    const headphoneTypes = ["over-ear", "in-ear", "on-ear"] as const

    // form validation schema
    const schema = z.object({
        name: z.string().min(1, { message: "name is requierd" }),
        brand: z.string().min(1, { message: "brand is required" }),
        price: z.number().min(0, { message: "price cannot be negative" }),
        fullTitle: z.string().min(1, { message: "full title is required" }),
        color: z.string().min(1, { message: "color is required" }),
        headphoneType: z.enum(headphoneTypes),
        description: z.array(
            z.object({
                id: z.number().min(1, { message: "id should be provided" }),
                point: z.string()
            })
        ).nonempty({ message: "descriptions must have atleast one point" })
    });

    type IForm = z.infer<typeof schema>

    // form input values
    const [formValues, setFormValues] = useState<IForm>({
        name: "",
        brand: "",
        color: "",
        fullTitle: "",
        price: 0,
        headphoneType: "over-ear",
        description: [{ id: Date.now(), point: "" }],
    });

    const [mainImage, setMainImage] = useState<File | null>(null);
    const [otherImages, setOtherImages] = useState<FileList | null>(null);


    type IFormErrors = {
        [k in keyof IForm]: string
    } & { descriptionPoints: { [id: number]: string }, mainImage: string, otherImages: string }

    const initalErrors: IFormErrors = {
        brand: "",
        name: "",
        color: "",
        description: "",
        fullTitle: "",
        headphoneType: "",
        price: "",
        // error for inidividual points
        descriptionPoints: { [formValues.description[0].id]: "" },
        mainImage: "",
        otherImages: ""
    }

    const [formErrors, setFormErrors] = useState(initalErrors);

    // form submition error
    const [submitionError, setSubmitionError] = useState("");

    const [loading, setLoading] = useState(false);

    /**
     * validates description points and images
     * @returns error object with three keys descriptionPoints, mainImage and otherImages 
     */
    const customValidation = () => {
        // array to store all invalid description points
        interface IerrorObj {
            descriptionPoints: IFormErrors["descriptionPoints"]
            mainImage: string
            otherImage: string
        }

        let validityStatus = true
        const errorsObj: IerrorObj = {
            descriptionPoints: { ...formErrors.descriptionPoints },
            mainImage: "",
            otherImage: ""
        }

        // validate description points
        formValues.description.forEach(p => {
            if (p.point.trim() === "") {
                validityStatus = false
                errorsObj.descriptionPoints[p.id] = "description point cannot be empty"
            }
        })

        if (mainImage === null) { validityStatus = false; errorsObj.mainImage = "required" }
        if (otherImages === null) { validityStatus = false; errorsObj.otherImage = "required" }

        setFormErrors(prev => (
            {
                ...prev,
                descriptionPoints: errorsObj.descriptionPoints,
                mainImage: errorsObj.mainImage,
                otherImages: errorsObj.otherImage
            }
        ))

        return validityStatus
    }


    const { signalRef } = useAbortController();
    const { isOnline } = useOnline();

    useEffect(() => {
        setSubmitionError(isOnline === false ? "You are offline" : "")
    }, [isOnline])



    // updates form values
    const handleChange = (key: keyof IForm, e: React.ChangeEvent<HTMLInputElement>) => setFormValues({ ...formValues, [key]: e.target.value })

    // update's headphone type value
    const handleHeadphoneTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (headphoneTypes.includes(e.target.value as any) === false) {
            throw Error(`options should be one of the values - ${headphoneTypes.join(", ")}`)
        }

        setFormValues({ ...formValues, headphoneType: e.target.value as typeof headphoneTypes[number] })
    }


    // add's a new description point
    const addDescriptionPoint = () => {
        const id = Date.now()

        setFormValues({ ...formValues, description: [...formValues.description, { id, point: "" }] })
        setFormErrors({ ...formErrors, descriptionPoints: { ...formErrors.descriptionPoints, [id]: "" } })
    }


    // delete's a description point
    const removeDescriptionPoint = (id: number) => {
        const filteredPoints = formValues.description.filter(d => d.id !== id)
        const newFormErrors = { ...formErrors }

        delete newFormErrors.descriptionPoints[id]


        setFormValues({ ...formValues, description: filteredPoints as typeof formValues["description"] })
        setFormErrors(newFormErrors)
    }

    // update's description point value
    const handleDescriptionPointChange = (id: number, e: React.ChangeEvent<HTMLInputElement>) => setFormValues(prev => {
        const copied = { ...prev }
        const index = copied.description.findIndex(d => d.id === id)
        if (index !== -1) copied.description[index].point = e.target.value
        return copied
    })





    const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();

        if (loading) return

        try {
            // validate text form values
            schema.parse(formValues)

            // validate description point values
            const valid = customValidation()
            if (valid === false) return


            const description: string[] = [...formValues.description.map(p => p.point)]

            const { brand, color, fullTitle, name, headphoneType } = formValues

            setLoading(true)
            // call api
            await addProductService({
                brand,
                color,
                description,
                fullTitle,
                headphoneType,
                name,
                price: formValues.price.toString(),
                mainImage: mainImage as File,
                images: otherImages as FileList
            }, signalRef.current.signal)


            // reset form errors and form values
            setFormValues({
                name: "",
                brand: "",
                color: "",
                fullTitle: "",
                price: 0,
                headphoneType: "over-ear",
                description: [formValues.description[0]],
            })

            setFormErrors(initalErrors)

            setLoading(false)
        }
        catch (ex) {
            setLoading(false);
            switch (true) {
                case (ex instanceof z.ZodError):
                    const { name, brand, color, fullTitle, price, description, headphoneType } = ex.formErrors.fieldErrors;

                    // check description points, images and updates formErrors state if any values are invalid 
                    customValidation();

                    return setFormErrors(prev => ({
                        ...prev,
                        name: name ? name[0] : "",
                        brand: brand ? brand[0] : "",
                        color: color ? color[0] : "",
                        fullTitle: fullTitle ? fullTitle[0] : "",
                        price: price ? price[0] : "",
                        description: description ? description[0] : "",
                        headphoneType: headphoneType ? headphoneType[0] : ""
                    }))


                case (ex instanceof AddProductBodyError):

                    return setFormErrors({
                        ...formErrors,
                        brand: ex.errors.brand || "",
                        color: ex.errors.color || "",
                        description: ex.errors.description || "",
                        fullTitle: ex.errors.fullTitle || "",
                        headphoneType: ex.errors.headphoneType || "",
                        name: ex.errors.name || "",
                        price: ex.errors.price || "",
                        mainImage: ex.errors.mainImage || "",
                        otherImages: ex.errors.images || ""
                    })


                case (ex instanceof ApiError):
                    return setSubmitionError(ex.message)

                case (ex instanceof CanceledError):
                    return
            }
        }
    }


    interface Inputs {
        label: FormInputProps["label"]
        value: FormInputProps["value"]
        onChange: FormInputProps["onChange"]
        inputType: FormInputProps["type"]
        errorMessage: string
    }
    const inputs: Inputs[] = [
        { label: "Product Name", inputType: "text", value: formValues.name, onChange: e => handleChange("name", e), errorMessage: formErrors.name },

        { label: "Brand", inputType: "text", value: formValues.brand, onChange: e => handleChange("brand", e), errorMessage: formErrors.brand },

        { label: "Product Full Title", inputType: "text", value: formValues.fullTitle, onChange: e => handleChange("fullTitle", e), errorMessage: formErrors.fullTitle },

        { label: "Color", inputType: "text", value: formValues.color, onChange: e => handleChange("color", e), errorMessage: formErrors.color },

        { label: "Price", inputType: "number", value: formValues.price, onChange: e => setFormValues({ ...formValues, price: Number(e.target.value) }), errorMessage: formErrors.price },
    ]




    interface FileInputs extends Inputs {
        multiple: boolean
    }
    const fileInputs: FileInputs[] = [
        { label: "Main Image", inputType: "file", value: undefined, multiple: false, onChange: e => setMainImage(e.target.files ? e.target.files[0] : null), errorMessage: formErrors.mainImage },

        { label: "Other Images", inputType: "file", value: undefined, multiple: true, onChange: e => setOtherImages(e.target.files), errorMessage: formErrors.otherImages }
    ]

    // checks for any error and returns classes accordingly
    const getInputClass = (error: string, className: string) => `${className} ${error !== "" ? styles.form_input_error : ""}`


    return (
        <div className={styles.page_layout}>
            <main className={styles.form_container}>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <h1 className={styles.form_header}>Add Product</h1>

                    <FormError type="form" errorMessage={submitionError} />


                    {/* inputs for name, brand, full title, color and price */}
                    {inputs.map(i => (
                        <Fragment key={i.label} >
                            <FormInput label={i.label} value={i.value} onChange={i.onChange} type={i.inputType}
                                className={getInputClass(i.errorMessage, styles.form_input)} />
                            <FormError type="field" errorMessage={i.errorMessage} className={styles.form_error} />
                        </Fragment>
                    ))}




                    {/* headphone type input */}
                    <label htmlFor="headphoneType">Headphone Type</label>
                    <select defaultValue={formValues.headphoneType} onChange={handleHeadphoneTypeChange}
                        id="headphoneType" className={`${getInputClass(formErrors.headphoneType, styles.form_input)} ${styles.select}`}>
                        {headphoneTypes.map(h => (
                            <option value={h} key={h}>{h}</option>
                        ))}
                    </select>
                    <FormError errorMessage={formErrors.headphoneType} type="field" className={styles.form_error} />


                    {/* inputs for main image and other side images */}
                    {fileInputs.map(f => (
                        <Fragment key={f.label}>
                            <FormInput label={f.label} value={f.value} type={f.inputType} onChange={f.onChange} multiple={f.multiple}
                                className={getInputClass(formErrors.otherImages, styles.form_input)} />
                            <FormError errorMessage={f.errorMessage} type="field" className={styles.form_error} />
                        </Fragment>
                    ))}




                    {/* descripion points header */}
                    <div className={styles.description_label_container}>
                        <label>Description</label>

                        {/* add description point button */}
                        <button className={styles.add_description_point_button} onClick={addDescriptionPoint} title="Add Point" type="button">
                            <img src={AddLogo} alt="" />
                        </button>
                    </div>



                    {formValues.description.map(d => (
                        // description point container
                        <div key={d.id} className={styles.description_point_container}>

                            {/* description input container */}
                            <div className={styles.description_point_input_container}>
                                <input type="text" value={d.point} onChange={e => handleDescriptionPointChange(d.id, e)}
                                    className={styles.description_point_input} />

                                {/* delete description point button */}
                                <button className={styles.add_description_point_button} title="Remove"
                                    onClick={() => removeDescriptionPoint(d.id)} type="button" >
                                    <img src={DeleteLogo} alt="" />
                                </button>
                            </div>

                            <FormError type="field" errorMessage={formErrors.descriptionPoints[d.id]} className={styles.form_error} />
                        </div>
                    ))}



                    {/* Submit button */}
                    <FormButton type="submit" text="Add" loading={loading} disabled={!isOnline}
                        variant="filled" className={styles.form_submit_button} />

                </form>

            </main>
        </div>
    );
}

export default AddProductPage;