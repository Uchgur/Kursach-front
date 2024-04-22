import { Form, Formik, FormikHelpers } from "formik";
import { reservationCreationDTO } from "./reservation.model";
import DateField from "../Forms/DateField";
import Button from "../Forms/Button";
import { Link } from "react-router-dom";
import CheckboxField from "../Forms/CheckBoxField";
import { useEffect } from "react";

export default function ReservationForm(props: reservationFormProps) {
    return (
        <Formik initialValues={props.model}
            onSubmit={props.onSubmit}>
            {(formikProps) => (
                <Form placeholder={"This is a placeholder"}>
                    <DateField displayName="Enter the start date of your reservation" field="startDate" />
                    <DateField displayName="Enter the end date of your reservation" field="endDate" />

                    {props.onConfirmation ? (
                        <>
                            <CheckboxField displayName="Submit reservation?" field="confirmation" />
                            <CheckboxField displayName="Cancel reservation?" field="canceled" />
                        </>
                    ) : null}

                    <Button disabled={formikProps.isSubmitting} type="submit">Save Changes</Button>
                    <Link to={`/hotels/hotel/${props.model.hotelId}`}>Cancel</Link>
                </Form>
            )}
        </Formik>
    )
}

interface reservationFormProps {
    model: reservationCreationDTO;
    onSubmit(values: reservationCreationDTO, actions: FormikHelpers<reservationCreationDTO>): void;
    onConfirmation: boolean;
}

ReservationForm.defaultProps = {
    onConfirmation: false
}