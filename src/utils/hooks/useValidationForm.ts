import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { InferType, AnyObjectSchema } from "yup";

export const useValidationForm = <T extends AnyObjectSchema>(
  validationSchema: T,
  defaultValues?: InferType<T>
) => {
  const formMethods = useForm<InferType<T>>({
    resolver: yupResolver(validationSchema),
    defaultValues,
  });

  return {
    ...formMethods,
    validationSchema,
  };
};
