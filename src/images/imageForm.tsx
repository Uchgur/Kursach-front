import { Form, Formik, FormikHelpers } from "formik";
import ImageField from "../Forms/ImageField";
import Button from "../Forms/Button";
import { imageCreationDTO } from "./image.model";
import css from "./imageForm.module.css"

export default function ImageForm(props: imageFormProps) {
    return (
        <Formik initialValues={props.model}
            onSubmit={props.onSubmit}
        >
            {(formikProps) => (
                <Form placeholder={"This is a placheholder"} className={css.form}>
                    <ImageField displayName="Image" field="file" />

                    <Button disabled={formikProps.isSubmitting} type="submit" className="submit-button">Upload Image</Button>
                </Form>
            )}
        </Formik>
    );
}

interface imageFormProps {
    model: imageCreationDTO;
    onSubmit(values: imageCreationDTO, actions: FormikHelpers<imageCreationDTO>) : void;
}