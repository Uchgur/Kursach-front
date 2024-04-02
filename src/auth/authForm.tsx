import { Form, Formik, FormikHelpers } from "formik";
import { userCredentials } from "./auth.model";
import { Link } from "react-router-dom";
import TextField from "../Forms/TextField";
import Button from "../Forms/Button";

export default function AuthForm(props: authFormProps){
    return (
        <Formik initialValues={props.model} onSubmit={props.onSubmit}>
            {formikProps => (
                <Form placeholder={"This is a placeholder"}>
                    <TextField displayName="Email" field="email" />
                    <TextField displayName="Password" field="password" type="password" />

                    <Button disabled={formikProps.isSubmitting} type="submit">Send</Button>
                    <Link className="btn btn-secondary" to="/feeders">Cancel</Link>
                </Form>
            )}
        </Formik>
    )
}

interface authFormProps {
    model: userCredentials;
    onSubmit(values: userCredentials, actions: FormikHelpers<userCredentials>) : void;
}