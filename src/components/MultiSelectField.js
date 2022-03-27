import React from "react";
import Select from "react-select";

const MultiSelectField = ({
  field,
  form: { errors, touched, setFieldValue },
  label,
  options,
  disabled,
  styles,
}) => {
  return (
    <div className="form-field">
      <div className="col-lg-12">
        <div className="form-group">
          <Select
            isDisabled={disabled}
            options={options}
            name={field.name}
            clearable={true}
            styles={styles || ""}
            isMulti
            value={
              options
                ? options.filter((option) =>
                    field.value.some((val) => val === option.value)
                  )
                : ""
            }
            onChange={(option) => {
              let val = option.map((item) => {
                return item.value;
              });
              setFieldValue(field.name, val);
            }}
            onBlur={field.onBlur}
          />
        </div>

        {touched[field.name] && errors[field.name] && (
          <div className="dropdown-select">
            <span style={{ color: "#DC3545" }}>{errors[field.name]}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiSelectField;
