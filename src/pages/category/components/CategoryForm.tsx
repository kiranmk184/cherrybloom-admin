import { SubmitHandler, useFormContext } from "react-hook-form";
import { CategorySchema } from "../schemas/categorySchema";
import { Container, Stack, Button } from "@mui/material";
import RHFTextField from "../../../components/form/RHFTextField";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const darkTheme = createTheme({
    palette: {
        mode: "dark",
    },
    components: {
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "var(--color-white)", // Change border color on focus
                    },
                },
            },
        },
    },
});

const CategoryForm = () => {
    const { handleSubmit } = useFormContext<CategorySchema>();

    const onSubmit: SubmitHandler<CategorySchema> = (data) => {
        console.log("Valid data: ", data);
    };

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Container
                className="w-full py-6 flex gap-4"
                component="form"
                onSubmit={handleSubmit(onSubmit)}
            >
                <Stack className="flex gap-4 flex-1">
                    <RHFTextField<CategorySchema>
                        name="displayMode"
                        label="Display Mode"
                    />
                    <RHFTextField<CategorySchema>
                        name="parentId"
                        label="Parent"
                    />
                    <RHFTextField<CategorySchema>
                        name="position"
                        label="Position"
                    />
                    <RHFTextField<CategorySchema>
                        name="categoryIcon"
                        label="Icon"
                    />
                    <RHFTextField<CategorySchema>
                        name="categoryImg"
                        label="Icon Path"
                    />
                    <RHFTextField<CategorySchema>
                        name="additional"
                        label="Additional"
                    />
                    <Button type="submit">Create</Button>
                </Stack>
            </Container>
        </ThemeProvider>
    );
};

export default CategoryForm;
