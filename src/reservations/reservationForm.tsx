import { Form, Formik, FormikHelpers } from "formik";
import { reservationCreationDTO } from "./reservation.model";
import DateField from "../Forms/DateField";
import Button from "../Forms/Button";
import { Link } from "react-router-dom";
import CheckboxField from "../Forms/CheckBoxField";
import css from "./reservationForm.module.css"
import TextField from "../Forms/TextField";

export default function ReservationForm(props: reservationFormProps) {
    return (
        <Formik initialValues={props.model}
            onSubmit={props.onSubmit}>
            {(formikProps) => (
                <Form placeholder={"This is a placeholder"} className={css.form}>
                    {props.onConfirmation ? (
                        <>
                            <h1>Reservation Confiramtion Page</h1>

                            <TextField displayName="Name" field="name" disabled={true} />
                            <TextField displayName="Surname" field="surname" disabled={true} />
                            <DateField displayName="Start date of user's reservation" field="startDate" disabled={props.onConfirmation} />
                            <DateField displayName="End date of user's reservation" field="endDate" disabled={props.onConfirmation} />
                            {props.model.payOffline ? (
                                <text>Payment method: offline</text>
                            ) : (
                                <></>
                            )}
                            <CheckboxField displayName="Submit reservation?" field="confirmation" text="Yes. (By deafault value is 'No')" />
                            <CheckboxField displayName="Cancel reservation?" field="canceled" text="Yes. (By deafault value is 'No')" />

                            <Button disabled={formikProps.isSubmitting} type="submit" className="submit-button">Save Changes</Button>
                            <Link to={`/hotels/${props.model.hotelId}/rooms/reservations`} className="cancel-button">Cancel</Link>
                        </>
                    ) : (
                        <>
                            <h1>Create New Reservation</h1>

                            <TextField displayName="Name" field="name" />
                            <TextField displayName="Surname" field="surname" />
                            <DateField displayName="Enter the start date of your reservation" field="startDate" disabled={props.onConfirmation} />
                            <DateField displayName="Enter the end date of your reservation" field="endDate" disabled={props.onConfirmation} />
                            <CheckboxField displayName="Pay Offline" field="payOffline" text="Yes. (By deafault value is 'No')" />
                            <CheckboxField displayName="Pay Online" field="payOnline" text="Currently unavailable" disabled={true}/>

                            <Button disabled={formikProps.isSubmitting} type="submit" className="submit-button">Save Changes</Button>
                            <Link to={`/hotels/hotel/${props.model.hotelId}`} className="cancel-button">Cancel</Link>
                        </>
                    )}
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