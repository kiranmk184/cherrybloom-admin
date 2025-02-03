import { FormProvider, UseFormReturn } from "react-hook-form";
import React from "react";

interface BaseFormProps<T extends Record<string, any>> {
    formMethods: UseFormReturn<T>;
    onSubmit: (data: T) => void;
    children: React.ReactNode;
}

export function BaseForm<T extends Record<string, any>>({
    formMethods,
    onSubmit,
    children
}: BaseFormProps<T>) {
    return (
        <FormProvider {...formMethods}>
            <form onSubmit={formMethods.handleSubmit(onSubmit)}>
                {children}
            </form>
        </FormProvider>
    )
};
