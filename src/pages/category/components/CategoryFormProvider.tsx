import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    CategorySchema,
    categorySchema,
    defaultValues,
} from "../types/categorySchema";
import CategoryForm from "./CategoryForm";
import { DevTool } from "@hookform/devtools";

const CategoryFormProvider = () => {
    const methods = useForm<CategorySchema>({
        // todo: change to suitable mode after implementing validation
        mode: "all",
        resolver: zodResolver(categorySchema),
        defaultValues,
    });

    return (
        <FormProvider {...methods}>
            <div className="m-2 flex flex-col">
                <h4 className="font-semibold text-white">Create Category</h4>
                <CategoryForm />
            </div>
            <DevTool control={methods.control} />
        </FormProvider>
    );
};

export default CategoryFormProvider;
