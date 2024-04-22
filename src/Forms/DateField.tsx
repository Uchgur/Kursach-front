import { useFormikContext } from "formik";

export default function DateField(props: dateFieldProps) {
  const { values, validateForm, touched, errors } = useFormikContext<any>();

  return (
    <div className="mb-3">
      <label htmlFor={props.field}>{props.displayName}</label>

      <input
        type="date"
        className="form-control"
        id={props.field}
        name={props.field}
        defaultValue={values[props.field]?.toISOString().split('T')[0]}
        onChange={(e) => {
          const date = new Date(e.currentTarget.value);
          values[props.field] = date;
          validateForm();
        }}
      />
      {touched[props.field] && errors[props.field] ? (
        <div className="text-danger">{errors[props.field]?.toString()}</div>
      ) : null}
    </div>
  );
}

interface dateFieldProps {
  field: string;
  displayName: string;
}