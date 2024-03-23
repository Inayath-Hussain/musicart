import { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import z from "zod";

import FormInput, { FormInputProps } from "@web/components/Users/FormInput";
import FormButton from "@web/components/Users/FormButton";
import { route } from "@web/routes";

import styles from "./common.module.css";
import loginStyles from "./Login.module.css";
import FormError from "@web/components/Users/FormError";
import { LoginBodyError, loginService } from "@web/services/user/login";
import { useAbortController } from "@web/hooks/useAbortController";
import { ApiError, CancelledError } from "@web/services/errors";
import { useOnline } from "@web/hooks/useOnline";

const LoginPage = () => {

    // validation schema for form values
    const schema = z.object({
        identifier: z.string().trim().min(1, "identifier is required"),
        password: z.string().trim().min(8, "must be atleast 8 letters long")
    }).refine(({ identifier }) => {

        // checks if the identifier value is either a valid email or a valid mobile number
        const emailSchema = z.string().trim().email()
        const mobileNumberSchema = /^[0-9]+$/

        const emailValidationResult = emailSchema.safeParse(identifier)

        return emailValidationResult.success || mobileNumberSchema.test(identifier)
    }, { message: "should be an email or mobile number", path: ["identifier"] })

    type IForm = z.infer<typeof schema>



    const [formValues, setFormValues] = useState<IForm>({
        identifier: "",
        password: ""
    });

    const initialFormErrors: IForm = {
        identifier: "",
        password: ""
    }

    const [formErrors, setFormErrors] = useState<IForm>(initialFormErrors)

    // state variable contain to display form submition error
    const [submitionError, setSubmitionError] = useState("");

    // state variable to indicate if a request is pending
    const [loading, setLoading] = useState(false);


    const navigate = useNavigate();
    const { signalRef } = useAbortController();
    const { isOnline } = useOnline();


    useEffect(() => {
        setSubmitionError(!isOnline ? "You are offline." : "")
    }, [isOnline])

    // updates form input values
    const handleChange = (key: keyof IForm, e: React.ChangeEvent<HTMLInputElement>) => setFormValues({ ...formValues, [key]: e.target.value })



    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            schema.parse(formValues)

            setLoading(true)
            const { identifier, password } = formValues
            await loginService({ identifier, password }, signalRef.current.signal)

            navigate(route.home)
            setLoading(false)
        }
        catch (ex) {
            setLoading(false);
            switch (true) {
                case (ex instanceof z.ZodError):
                    const { identifier, password } = ex.formErrors.fieldErrors
                    return setFormErrors({
                        identifier: identifier ? identifier[0] : "",
                        password: password ? password[0] : ""
                    })


                case (ex instanceof LoginBodyError):
                    return setFormErrors({
                        identifier: ex.errors.identifier || "",
                        password: ex.errors.password || ""
                    })

                case (ex instanceof CancelledError):
                    break;

                case (ex instanceof ApiError):
                    setSubmitionError(ex.message)
            }
            console.log(ex)
            setFormErrors(initialFormErrors)
        }
    }


    interface InputsArray {
        label: FormInputProps["label"]
        value: FormInputProps["value"]
        onChange: FormInputProps["onChange"]
        inputType: FormInputProps["type"]
        errorMessage: string
    }

    const inputs: InputsArray[] = [
        { label: "Enter your email or mobile number", inputType: "text", value: formValues.identifier, errorMessage: formErrors.identifier, onChange: e => handleChange("identifier", e) },
        { label: "Password", inputType: "password", value: formValues.password, errorMessage: formErrors.password, onChange: e => handleChange("password", e) }
    ]


    const getInputClass = (error: string) => `${styles.form_input} ${error !== "" ? styles.form_input_error : ""}`

    return (
        <div className={styles.form_container}>

            <h1 className={styles.welcome_text}>Welcome</h1>

            <form className={styles.form} onSubmit={handleSubmit}>

                <FormError errorMessage={submitionError} className={styles.form_submition_error} type="form" />

                {/* form header */}
                <h1 className={styles.form_header}>Sign in <span>Already a customer?</span> </h1>


                {/* inputs */}
                {inputs.map(i => (
                    <Fragment key={i.label}>
                        <FormInput value={i.value} onChange={i.onChange} type={i.inputType} label={i.label} className={getInputClass(i.errorMessage)} />
                        <FormError errorMessage={i.errorMessage} className={styles.form_error} type="field" />
                    </Fragment>
                ))}

                {/* login button */}
                <FormButton text="Continue" type="submit" className={styles.form_button} variant="filled"
                    disabled={!isOnline} loading={loading} />

                {/* terms and conditions */}
                <p className={styles.terms}>By continuing, you agree to Musicart privacy notice and conditions of use.</p>

            </form>


            {/* divider */}
            <div className={loginStyles.divider}>
                <hr className={loginStyles.divider_line} />
                <p className={loginStyles.divider_text}>New to Musicart?</p>
                <hr className={loginStyles.divider_line} />
            </div>


            {/* link to register page */}
            <Link to={route.users.register}>
                <FormButton type="button" text="Create your Musicart account" variant="outline" className={styles.link_button} />
            </Link>

        </div>
    );
}

export default LoginPage;