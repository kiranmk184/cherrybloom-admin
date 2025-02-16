import { Slider, Typography } from "@mui/material";
import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";

type Props<T extends FieldValues> = {
    name: Path<T>;
    label: string;
};

const RHFSlider = <T extends FieldValues>({ name, label }: Props<T>) => {
    const { control } = useFormContext();

    return (
        <Controller
            control={control}
            name={name}
            render={(field) => (
                <>
                    <Typography className="text-black">{label}</Typography>
                    <Slider valueLabelDisplay="auto" {...field} />
                </>
            )}
        />
    );
};

export default RHFSlider;
