import { Form, Formik, FormikHelpers } from "formik";
import { hotelCreationDTO } from "./hotel.model";
import TextField from "../Forms/TextField";
import ImageField from "../Forms/ImageField";
import Button from "../Forms/Button";
import { Link } from "react-router-dom";
import css from "./hotelForm.module.css"
import MarkdownField from "../Forms/MarkdownField";

export default function HotelForm(props: hotelFormProps) {
    return (
        <Formik initialValues={props.model}
            onSubmit={props.onSubmit}
        >
            {(formikProps) => (
                <Form placeholder={"This is a placheholder"} className={css.form}>
                    {props.onEdit ? (
                        <h1>Edit Hotel</h1>
                    ) : (
                        <h1>Create New Hotel</h1>
                    )}
                    <TextField displayName="Name" field="name" />
                    <TextField displayName="Country" field="country" />
                    <TextField displayName="City" field="city" />
                    <TextField displayName="Address" field="address" />
                    <TextField displayName="Contact Information" field="contactInformation" />
                    <MarkdownField displayName="Description" field="description" />
                    <ImageField displayName="Prewiew image" field="image" imageURL={props.model.imageURL} />

                    <Button disabled={formikProps.isSubmitting} type="submit" className="submit-button">Save Changes</Button>
                    <Link to="/hotels" className="cancel-button">Cancel</Link>
                </Form>
            )}
        </Formik>
    );
}

interface hotelFormProps {
    model: hotelCreationDTO;
    onSubmit(values: hotelCreationDTO, actions: FormikHelpers<hotelCreationDTO>): void;
    onEdit: boolean;
}