import { useState, Fragment, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import z from "zod";

import FormButton from "@web/components/Users/FormButton";
import FormError from "@web/components/Users/FormError";
import FormInput, { FormInputProps } from "@web/components/Users/FormInput";
import { route } from "@web/routes";

import styles from "./common.module.css";
import registerStyles from "./Register.module.css"
import { RegisterBodyError, registerService } from "@web/services/user/register";
import { useAbortController } from "@web/hooks/useAbortController";
import { useOnline } from "@web/hooks/useOnline";
import { ApiError, CancelledError } from "@web/services/errors";

const RegisterPage = () => {

    const [queryString] = useSearchParams();
    const nextRoute = queryString.get("path");

    const baseRequirement = (fieldName: string) => z.string().trim().min(1, { message: `${fieldName} is required` })

    // validation schema for form values
    const schema = z.object({
        name: baseRequirement("name"),
        mobileNumber: baseRequirement("mobile number"),
        email: baseRequirement("email").email("email is invalid"),
        password: baseRequirement("password").min(8, "must be atleast 8 letters long")
    })

    type IForm = z.infer<typeof schema>

    const [formValues, setFormValues] = useState<IForm>({
        name: "",
        mobileNumber: "",
        email: "",
        password: ""
    })


    const initalErrors: IForm = {
        name: "",
        mobileNumber: "",
        email: "",
        password: ""
    }

    // state variable to store all form field errors
    const [formErrors, setFormErrors] = useState<IForm>(initalErrors)

    // state variable contain to display form submition error
    const [submitionError, setSubmitionError] = useState("");

    // state variable to indicate if a request is pending
    const [loading, setLoading] = useState(false);


    const navigate = useNavigate();
    const { signalRef } = useAbortController();
    const { isOnline } = useOnline();


    useEffect(() => {
        setSubmitionError(!isOnline ? "You are offline" : "")
    }, [isOnline])

    // update's form values
    const handleChange = (key: keyof IForm, e: React.ChangeEvent<HTMLInputElement>) => setFormValues({ ...formValues, [key]: e.target.value })

    const handleSubmit: React.FormEventHandler = async (e) => {
        e.preventDefault();

        try {
            // validate form values
            schema.parse(formValues)

            setLoading(true)
            const { name, mobileNumber, email, password } = formValues;
            await registerService({ name, mobileNumber, email, password }, signalRef.current.signal)

            navigate(nextRoute || route.home)
            setLoading(false)
        }
        catch (ex) {
            setLoading(false)
            switch (true) {
                case (ex instanceof z.ZodError):
                    const { name, mobileNumber, email, password } = ex.formErrors.fieldErrors

                    return setFormErrors({
                        name: name ? name[0] : "",
                        mobileNumber: mobileNumber ? mobileNumber[0] : "",
                        email: email ? email[0] : "",
                        password: password ? password[0] : ""
                    })

                case (ex instanceof RegisterBodyError):
                    return setFormErrors({
                        name: ex.errors.name || "",
                        mobileNumber: ex.errors.mobileNumber || "",
                        email: ex.errors.email || "",
                        password: ex.errors.password || ""
                    })

                case (ex instanceof CancelledError):
                    break;

                case (ex instanceof ApiError):
                    setSubmitionError(ex.message)
            }

            setFormErrors(initalErrors)
        }
    }


    const getInputClass = (error: string) => `${styles.form_input} ${error !== "" ? styles.form_input_error : ""}`


    interface InputsArray {
        label: FormInputProps["label"]
        value: FormInputProps["value"]
        onChange: FormInputProps["onChange"]
        inputType: FormInputProps["type"]
        errorMessage: string
    }

    const inputs: InputsArray[] = [
        { label: "Your name", value: formValues.name, inputType: "text", errorMessage: formErrors.name, onChange: (e) => handleChange("name", e), },
        { label: "Mobile number", value: formValues.mobileNumber, inputType: "number", errorMessage: formErrors.mobileNumber, onChange: (e) => handleChange("mobileNumber", e), },
        { label: "Email Id", value: formValues.email, inputType: "email", errorMessage: formErrors.email, onChange: (e) => handleChange("email", e), },
        { label: "Password", value: formValues.password, inputType: "password", errorMessage: formErrors.password, onChange: (e) => handleChange("password", e), },
    ]


    const loginLink = nextRoute ? `${route.users.login}?path=${nextRoute}` : route.users.login

    return (
        <div className={styles.form_container} >
            <h1 className={styles.welcome_text}>Welcome</h1>

            <form className={styles.form} onSubmit={handleSubmit}>

                <FormError errorMessage={submitionError} type="form" className={styles.form_submition_error} />

                {/* form header */}
                <h1 className={styles.form_header}>Create account. <span>Don’t have an account?</span> </h1>

                {/* form inputs */}
                {inputs.map(i => (
                    <Fragment key={i.label}>
                        <FormInput label={i.label} value={i.value} onChange={i.onChange} type={i.inputType} className={getInputClass(i.errorMessage)} />
                        <FormError errorMessage={i.errorMessage} className={styles.form_error} type="field" />
                    </Fragment>
                ))}

                {/* account registeration info */}
                <p className={registerStyles.register_info}>By enrolling your mobile phone number, you consent to receive automated security notifications via text message from Musicart. Message and data rates may apply.</p>

                {/* register button */}
                <FormButton text="Continue" type="submit" variant="filled" className={styles.form_button}
                    disabled={!isOnline} loading={loading} />

                {/* terms and conditions */}
                <p className={styles.terms}>By continuing, you agree to Musicart privacy notice and conditions of use.</p>

            </form>


            {/* link to login page */}
            <p className={registerStyles.link_text}>
                Already have an account?
                <Link to={loginLink} className={registerStyles.link}>
                    Sign in
                </Link>
            </p>

        </div>
    );
}

export default RegisterPage;