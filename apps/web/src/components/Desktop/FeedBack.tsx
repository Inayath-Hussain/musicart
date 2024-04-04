import { useContext, useEffect, useRef, useState } from "react";

import FeedbackIcon from "@web/assets/icons/feedback_logo.svg";
import { authTokenContext } from "@web/context/authTokens";

import styles from "./FeedBack.module.css";
import FormError from "../Users/FormError";
import { useOnline } from "@web/hooks/useOnline";
import { AddFeedbackBodyError, addFeedbackService } from "@web/services/feedback/addFeedback";
import { UnauthorizedError } from "@web/services/errors";
import { useNavigate } from "react-router-dom";
import { route } from "@web/routes";
import { toast } from "react-toastify";



const feedbackTypeEnum = ["bugs", "feedback", "query"] as const


const FeedBack = () => {

    const { accessToken, refreshToken } = useContext(authTokenContext);
    const { isOnline } = useOnline();
    const navigate = useNavigate();

    const formRef = useRef<HTMLFormElement | null>(null)
    const buttonRef = useRef<HTMLButtonElement | null>(null)


    useEffect(() => {

        // if clicked outside of form then close the form
        const handleClick = (e: MouseEvent) => {
            const targetDomSubTree = e.composedPath()
            if ((formRef.current && buttonRef.current) &&
                targetDomSubTree.includes(formRef.current) === false && targetDomSubTree.includes(buttonRef.current) === false) {
                setOpenForm(false)
            }
        }


        // when user scrolls, close form
        const handleScroll = () => setOpenForm(false);

        window.addEventListener("click", handleClick)
        window.addEventListener("scroll", handleScroll)

        return () => {
            window.removeEventListener("click", handleClick)
            window.removeEventListener("scroll", handleScroll)
        }
    }, [])


    const [openForm, setOpenForm] = useState(false);

    const [feedbackType, setFeedbackType] = useState<typeof feedbackTypeEnum[number] | "">("");
    const [feedback, setFeedback] = useState("");


    const initialErrors = {
        feedbackType: "",
        feedback: ""
    }

    const [errors, setErrors] = useState(initialErrors);


    const validate = () => {
        const initialErrorsCopy = { ...initialErrors }
        let valid = true;

        if (feedbackType === "") { valid = false; initialErrorsCopy.feedbackType = "required" }
        if (feedback === "") { valid = false; initialErrorsCopy.feedback = "required" }

        setErrors(initialErrorsCopy)
        return valid
    }


    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();


        const isValid = validate()

        if (isValid === false) return
        if (isOnline === false) {
            toast("you are offline")
            return
        }

        addFeedbackService({ feedback, feedbackType })
            .then(() => {
                toast("feedback added")

                setOpenForm(false);
                setErrors(initialErrors);
                setFeedback("");
                setFeedbackType("");
            })
            .catch(err => {
                if (err instanceof UnauthorizedError) {
                    navigate(route.users.login + "?path=" + route.home)
                    toast("please login again")
                    return
                }

                if (err instanceof AddFeedbackBodyError) {
                    setErrors(err.errors)
                    return
                }

                toast(err.message)
            })

    }


    const getErrorClass = (errorMessage: string) => errorMessage !== "" ? styles.errors : ""

    return (
        (accessToken && refreshToken) &&

        <div className={styles.feedback_container}>

            {
                openForm &&

                <form className={styles.form} ref={formRef} onSubmit={handleSubmit}>

                    <label htmlFor="type_of_feedback" className={styles.label} >Type of feedback</label>

                    <select id="type_of_feedback" className={`${styles.select} ${getErrorClass(errors.feedbackType)}`}

                        value={feedbackType} onChange={e => setFeedbackType(e.target.value as typeof feedbackType)}>

                        <option value="" hidden>Choose the type</option>
                        {feedbackTypeEnum.map(f => (
                            <option value={f} className={styles.option}>{f}</option>
                        ))}
                    </select>

                    <FormError type="field" errorMessage={errors.feedbackType} className={styles.error_message} />




                    <label htmlFor="feedback" className={styles.label} >Feedback</label>

                    <textarea id="feedback" placeholder="Type your feedback" rows={6}
                        className={`${styles.textarea} ${getErrorClass(errors.feedback)}`}
                        value={feedback} onChange={e => setFeedback(e.target.value)} />

                    <FormError type="field" errorMessage={errors.feedback} className={styles.error_message} />



                    <button className={styles.submit_button}>
                        Submit
                    </button>

                </form>

            }

            <button className={styles.feedback_button} onClick={() => setOpenForm(prev => !prev)} ref={buttonRef}>
                <img src={FeedbackIcon} alt="" width={40} />
            </button>
        </div>
    );
}

export default FeedBack;