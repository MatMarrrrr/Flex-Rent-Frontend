import React from "react";
import { useField, ErrorMessage } from "formik";
import { ErrorWrapper } from "../../styledComponents/authComponents";
import Select from "./Select";

interface FormikSelectFieldProps {
  name: string;
  label: string;
  isRequired?: boolean;
  margin?: string;
  startValue: string;
  options: { value: string; label: string }[];
}

const FormikSelectField: React.FC<FormikSelectFieldProps> = ({
  name,
  label,
  isRequired = false,
  margin,
  startValue,
  options,
}) => {
  const [field, , helpers] = useField(name);
  const { value } = field;
  const { setValue } = helpers;

  return (
    <>
      <Select
        label={label}
        options={options}
        isRequired={isRequired}
        margin={margin}
        name={name}
        startValue={startValue}
        value={value}
        onChange={(val) => setValue(val)}
      />
      <ErrorWrapper>
        <ErrorMessage name={name} />
      </ErrorWrapper>
    </>
  );
};

export default FormikSelectField;
