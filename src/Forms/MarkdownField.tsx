import { Field, useFormikContext } from "formik";
import css from "./MarkdownField.module.css"

export default function MarkdownField(props: markdownFieldProps) {
    const { values } = useFormikContext<any>();
    return (
        <div className={css.div}>
            <label>{props.displayName}</label>
            <div>
                <Field name={props.field} as="textarea" className={`${css.markdownfield} form-textarea`} />
            </div>
        </div>
    )
}

interface markdownFieldProps {
    displayName: string;
    field: string;
}