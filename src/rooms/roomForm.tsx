import { Form, Formik, FormikHelpers } from "formik";
import TextField from "../Forms/TextField";
import ImageField from "../Forms/ImageField";
import Button from "../Forms/Button";
import { Link } from "react-router-dom";
import { roomCreationDTO } from "./room.model";

export default function RoomForm(props: roomFormProps) {
    return (
        <Formik initialValues={props.model}
            onSubmit={props.onSubmit}
        >
            {(formikProps) => (
                <Form placeholder={"This is a placheholder"}>
                    <TextField displayName="Room Type" field="type" />
                    <TextField displayName="Number of Beds" field="beds" type="number"/>
                    <TextField displayName="Price" field="price" />
                    <TextField displayName="Description" field="description"/>
                    <ImageField displayName="Prewiew image" field="image" />

                    <Button disabled={formikProps.isSubmitting} type="submit">Save Changes</Button>
                    <Link to={`/hotels/${props.model.hotelId}`}>Cancel</Link>
                </Form>
            )}
        </Formik>
    );
}

interface roomFormProps {
    model: roomCreationDTO;
    onSubmit(values: roomCreationDTO, actions: FormikHelpers<roomCreationDTO>) : void;
}