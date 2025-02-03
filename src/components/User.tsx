import { UserValidation } from "../validations/userValidation";
import { useValidationForm } from "../hooks/useValidationForm";
import { BaseForm } from "./form/BaseForm";
import { InputField, FileUploadField } from "./form/FormFields";
import { joiResolver } from "@hookform/resolvers/joi";

const UserForm = ({ initialData }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useValidationForm(useValidationForm(UserValidation.create, initialData));

  const onSubmit = (data) => {
    console.log("Valid data: ", data);
  };

  return (
    <BaseForm
      formMethods={{ control, handleSubmit, errors }}
      onSubmit={onSubmit}
    >
      <InputField
        name="name"
        label="Full Name"
        control={control}
        errors={errors}
      />

      <FileUploadField
        name="avatar"
        label="Profile Picture"
        control={control}
        errors={errors}
        accept="image/*"
      />

      <button type="submit">Submit</button>
    </BaseForm>
  );
};
