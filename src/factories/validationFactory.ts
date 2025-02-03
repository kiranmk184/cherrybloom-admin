import * as Yup from "yup";

type ValidationConfig = {
  required?: boolean;
  type: "string" | "number" | "boolean" | "array" | "file" | "date";
  min?: number;
  max?: number;
  matches?: RegExp;
  nullable?: boolean;
  label?: string;
  allowedFormats?: string[];
  maxSize?: number;
};

export const createValidator = (config: ValidationConfig) => {
  let schema: Yup.AnySchema;

  switch (config.type) {
    case "string":
      schema = Yup.string();
      break;
    case "number":
      schema = Yup.number();
      break;
    case "boolean":
      schema = Yup.boolean();
      break;
    case "array":
      schema = Yup.array();
      break;
    case "file":
      schema = Yup.mixed<File>();
      break;
    case "date":
      schema = Yup.date();
      break;
    default:
      throw new Error(`Unsupported type: ${config.type}`);
  }

  if (config.nullable) schema = schema.nullable();
  if (config.required) schema = schema.required(`${config.label} is required.`);

  if (config.min !== undefined) {
    if (config.type === "string") {
      schema = (schema as Yup.StringSchema).min(
        config.min,
        `${config.label} must be at least ${config.min} characters`
      );
    } else if (config.type === "number") {
      schema = (schema as Yup.NumberSchema).min(
        config.min,
        `${config.label} must be at least ${config.min}`
      );
    }
  }

  if (config.max !== undefined) {
    if (config.type === "string") {
      schema = (schema as Yup.StringSchema).max(
        config.max,
        `${config.label} must be at least ${config.max} characters`
      );
    } else if (config.type === "number") {
      schema = (schema as Yup.NumberSchema).max(
        config.max,
        `${config.label} must be at least ${config.max}`
      );
    }
  }

  if (config.matches) {
    schema = (schema as Yup.StringSchema).matches(
      config.matches,
      `${config.label} format is invalid`
    );
  }

  if (config.type === "file") {
    schema = schema
      .test(
        "file-format",
        "Invalid file format",
        (value) =>
          !value ||
          (config.allowedFormats?.includes((value as File).type) ?? true)
      )
      .test(
        "file-size",
        "File too large",
        (value) =>
          !value ||
          (config.maxSize ? (value as File).size <= config.maxSize : true)
      );
  }

  return schema;
};
