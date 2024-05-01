import { Form, Formik, FormikHelpers } from "formik";
import { userCredentials } from "./auth.model";
import { Link } from "react-router-dom";
import TextField from "../Forms/TextField";
import Button from "../Forms/Button";
import css from "./authForm.module.css"

export default function AuthForm(props: authFormProps) {
    return (
        <Formik initialValues={props.model} onSubmit={props.onSubmit}>
            {formikProps => (
                <Form placeholder={"This is a placeholder"} className={css.form}>
                    {props.isRegister ? (
                        <h1>Register</h1>
                    ) : (
                        <h1>Login</h1>
                    )}
                    <TextField displayName="Email" field="email" />
                    <TextField displayName="Password" field="password" type="password" />

                    <Button disabled={formikProps.isSubmitting} type="submit" className="submit-button">Send</Button>
                    <Link className="cancel-button" to="/hotels">Cancel</Link>
                </Form>
            )}
        </Formik>
    )
}

interface authFormProps {
    model: userCredentials;
    onSubmit(values: userCredentials, actions: FormikHelpers<userCredentials>): void;
    isRegister: boolean;
}