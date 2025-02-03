import { Controller } from "react-hook-form";

export const InputField = ({ name, label, control, errors, ...props }) => (
  <div className="form-group">
    <label htmlFor={name}>{label}</label>
    <Controller
      name={name}
      control={control}
      render={({ field }) => <input {...field} {...props} />}
    />
    {errors[name] && <span className="error">{errors[name].message}</span>}
  </div>
);

export const FileUploadField = ({ name, label, control, errors, ...props }) => (
  <div className="form-group">
    <label htmlFor={name}>{label}</label>
    <Controller
      name={name}
      control={control}
      render={({ field }) => <input {...field} {...props} />}
    />
    {errors[name] && <span className="error">{errors[name].message}</span>}
  </div>
);

// similar components for SelectField, FileUploadField, CheckboxGroupField, etc.
