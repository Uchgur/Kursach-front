import { useFormikContext } from "formik";

export default function CheckboxField(props: checkboxFieldProps) {
  const { values, setFieldValue } = useFormikContext<any>();

  return (
    <div className="mb-3">
      <label htmlFor={props.field}>{props.displayName}</label>

      <input
        type="checkbox"
        className="form-control"
        id={props.field}
        name={props.field}
        checked={values[props.field] === true}
        onChange={(e) => {
          setFieldValue(props.field, e.currentTarget.checked ? true : false);
        }}
      />
    </div>
  );
}

interface checkboxFieldProps {
  field: string;
  displayName: string;
}
