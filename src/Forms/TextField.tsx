import { Field } from "formik";
import css from "./TextField.module.css"

export default function TextField(props: textFieldProps) {
    return(
        <div className={css.div}>
            <label htmlFor={props.field}>{props.displayName}</label>
            <Field name={props.field} id={props.field} className={`${css.field} form-control`} type={props.type} />
        </div>
    )
}

interface textFieldProps {
    field: string;
    displayName: string;
    type: 'text' | 'password' | 'number';
}

TextField.defaultProps = {
    type: 'text'
}