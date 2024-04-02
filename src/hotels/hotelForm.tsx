import { Form, Formik, FormikHelpers } from "formik";
import { hotelCreationDTO } from "./hotel.model";
import TextField from "../Forms/TextField";
import ImageField from "../Forms/ImageField";
import Button from "../Forms/Button";
import { Link } from "react-router-dom";

export default function HotelForm(props: hotelFormProps) {
    return (
        <Formik initialValues={props.model}
            onSubmit={props.onSubmit}
        >
            {(formikProps) => (
                <Form placeholder={"This is a placheholder"}>
                    <TextField displayName="Name" field="name" />
                    <TextField displayName="City" field="city" />
                    <TextField displayName="Address" field="address" />
                    <TextField displayName="Contact Information" field="contactInformation" />
                    <TextField displayName="Description" field="description"/>
                    <ImageField displayName="Prewiew image" field="image" imageURL={props.model.imageURL}/>

                    <Button disabled={formikProps.isSubmitting} type="submit">Save Changes</Button>
                    <Link to="/hotels">Cancel</Link>
                </Form>
            )}
        </Formik>
    );
}

interface hotelFormProps {
    model: hotelCreationDTO;
    onSubmit(values: hotelCreationDTO, actions: FormikHelpers<hotelCreationDTO>) : void;
}