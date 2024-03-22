import { useState } from "react";
import * as yup from "yup";

import FormInput from "@web/components/Users/FormInput";

import styles from "./common.module.css";
import registerStyles from "./Register.module.css"
import FormButton from "@web/components/Users/FormButton";
import { Link } from "react-router-dom";
import { route } from "@web/routes";

const RegisterPage = () => {

    const baseRequirement = (fieldName: string) => yup.string().trim().required(`${fieldName} is required`)

    const schema = yup.object({
        name: baseRequirement("name"),
        mobileNumber: baseRequirement("mobile number"),
        email: baseRequirement("email").email("email is invalid"),
        password: baseRequirement("password").min(8, "must be atleast 8 letters long")
    })

    type IForm = yup.InferType<typeof schema>

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

    const [formErrors, setFormErros] = useState<IForm>(initalErrors)



    const handleChange = (key: keyof IForm, e: React.ChangeEvent<HTMLInputElement>) => setFormValues({ ...formValues, [key]: e.target.value })

    const handleSubmit: React.FormEventHandler = (e) => {
        e.preventDefault();
    }

    return (
        <div className={styles.form_container} >
            <h1 className={styles.welcome_text}>Welcome</h1>

            <form className={styles.form} onSubmit={handleSubmit}>

                <h1 className={styles.form_header}>Create account. <span>Don’t have an account?</span> </h1>

                <FormInput label="Your name" value={formValues.name} type="text" onChange={(e) => handleChange("name", e)}
                    className={styles.form_input} />

                <FormInput label="Mobile number" value={formValues.mobileNumber} type="number" onChange={(e) => handleChange("mobileNumber", e)}
                    className={styles.form_input} />

                <FormInput label="Email Id" value={formValues.email} type="email" onChange={(e) => handleChange("email", e)}
                    className={styles.form_input} />

                <FormInput label="Password" value={formValues.password} type="password" onChange={(e) => handleChange("password", e)}
                    className={styles.form_input} />


                <p className={registerStyles.register_info}>By enrolling your mobile phone number, you consent to receive automated security notifications via text message from Musicart. Message and data rates may apply.</p>


                <FormButton text="Continue" type="submit" variant="filled" className={styles.form_button} />

                <p className={styles.terms}>By continuing, you agree to Musicart privacy notice and conditions of use.</p>

            </form>


            <p className={registerStyles.link_text}>
                Already have an account?
                <Link to={route.users.login} className={registerStyles.link}>
                    Sign in
                </Link>
            </p>

        </div>
    );
}

export default RegisterPage;