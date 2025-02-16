import { object } from "yup";
import { createValidator } from "../factories/validationFactory";

export const CategoryValidation = {
  create: object().shape({
    name: createValidator({
      type: "string",
      required: true,
      label: "Name",
      min: 3,
      max: 255,
    }),
    email: createValidator({
      type: "string",
      required: true,
      label: "Email",
      matches: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    }),
    avatar: createValidator({
      type: "file",
      label: "Avatar",
      allowedFormats: ["image/jpeg", "image/png"],
      maxSize: 2 * 1024 * 1024, // 2MB
    }),
    roles: (
      createValidator({
        type: "array",
        required: true,
        label: "Roles",
      }) as Yup.ArraySchema<any, string>
    ).min(1, "At least one role must be selected"),
  }),

  update: Yup.object().shape({
    // Different validation rules for update
  }),
};
