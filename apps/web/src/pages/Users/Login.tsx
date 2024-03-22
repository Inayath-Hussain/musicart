import { useState } from "react";
import * as yup from "yup";

import FormInput from "@web/components/Users/FormInput";
import FormButton from "@web/components/Users/FormButton";

import styles from "./common.module.css";
import loginStyles from "./Login.module.css";
import { Link } from "react-router-dom";
import { route } from "@web/routes";

const LoginPage = () => {

    const schema = yup.object({
        email: yup.string().trim().email("email is invalid").required("email is required"),
        password: yup.string().trim().min(8, "must be atleast 8 letters long").required()
    })

    type IForm = yup.InferType<typeof schema>

    const [formValues, setFormValues] = useState<IForm>({
        email: "",
        password: ""
    });

    const handleChange = (key: keyof IForm, e: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues({ ...formValues, [key]: e.target.value })
    }


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    return (
        <div className={styles.form_container}>

            <h1 className={styles.welcome_text}>Welcome</h1>

            <form className={styles.form} onSubmit={handleSubmit}>
                <h1 className={styles.form_header}>Sign in <span>Already a customer?</span> </h1>

                <FormInput value={formValues.email} onChange={e => handleChange("email", e)} type="text"
                    label="Enter your email or mobile number" className={styles.form_input} />

                <FormInput value={formValues.password} onChange={e => handleChange("password", e)} type="password"
                    label="Password" />

                <FormButton text="Continue" type="submit" className={styles.form_button} variant="filled" />

                <p className={styles.terms}>By continuing, you agree to Musicart privacy notice and conditions of use.</p>

            </form>


            {/* divider */}
            <div className={loginStyles.divider}>
                <hr className={loginStyles.divider_line} />
                <p className={loginStyles.divider_text}>New to Musicart?</p>
                <hr className={loginStyles.divider_line} />
            </div>


            <Link to={route.users.register}>
                <FormButton type="button" text="Create your Musicart account" variant="outline" className={styles.link_button} />
            </Link>

        </div>
    );
}

export default LoginPage;