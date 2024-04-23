import { Form, Formik, FormikHelpers } from "formik";
import TextField from "../Forms/TextField";
import ImageField from "../Forms/ImageField";
import Button from "../Forms/Button";
import { Link } from "react-router-dom";
import { roomCreationDTO } from "./room.model";
import MarkdownField from "../Forms/MarkdownField";
import css from "./roomForm.module.css"

export default function RoomForm(props: roomFormProps) {
    return (
        <Formik initialValues={props.model}
            onSubmit={props.onSubmit}
        >
            {(formikProps) => (
                <Form placeholder={"This is a placheholder"} className={css.form}>
                    {props.onEdit ? (
                        <h1>Edit Room</h1>
                    ) : (
                        <h1>Create New Room</h1>
                    )}
                    <TextField displayName="Room Type" field="type" />
                    <TextField displayName="Number of Beds" field="beds" type="number"/>
                    <TextField displayName="Price" field="price" />
                    <MarkdownField displayName="Description" field="description"/>
                    <ImageField displayName="Prewiew image" field="image" imageURL={props.model.imageURL}/>

                    <Button disabled={formikProps.isSubmitting} type="submit" className="submit-button">Save Changes</Button>
                    <Link to={`/hotels/${props.model.hotelId}`} className="cancel-button">Cancel</Link>
                </Form>
            )}
        </Formik>
    );
}

interface roomFormProps {
    model: roomCreationDTO;
    onSubmit(values: roomCreationDTO, actions: FormikHelpers<roomCreationDTO>) : void;
    onEdit: boolean;
}