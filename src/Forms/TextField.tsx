import { Field } from "formik";

export default function TextField(props: textFieldProps) {
    return(
        <div className="mb-3">
            <label htmlFor={props.field}>{props.displayName}</label>
            <Field name={props.field} id={props.field} className="form-control" type={props.type} />
        </div>
    )
}

interface textFieldProps {
    field: string;
    displayName: string;
    type: 'text' | 'password';
}

TextField.defaultProps = {
    type: 'text'
}