import { useFormikContext } from "formik";
import css from "./CheckBoxField.module.css"

export default function CheckboxField(props: checkboxFieldProps) {
  const { values, setFieldValue } = useFormikContext<any>();

  return (
    <div className={css.div}>
      <label htmlFor={props.field}>{props.displayName}</label>

      <input
        type="checkbox"
        className="form-control"
        id={props.field}
        name={props.field}
        disabled={props.disabled}
        checked={values[props.field] === true}
        onChange={(e) => {
          setFieldValue(props.field, e.currentTarget.checked ? true : false);
        }}
      />
      
      <text>{props.text}</text>
    </div>
  );
}

interface checkboxFieldProps {
  field: string;
  displayName: string;
  text: string;
  disabled: boolean;
}

CheckboxField.defaultProps = {
  disabled: false
}
