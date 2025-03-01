import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import { Option } from "../../utils/types/option";
import {
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
} from "@mui/material";

type Props<T extends FieldValues> = {
    name: Path<T>;
    label: string;
    options?: Option[];
};

const RHFRadioGroup = <T extends FieldValues>({
    name,
    label,
    options,
}: Props<T>) => {
    const { control } = useFormContext();

    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState: { error } }) => (
                <FormControl {...field} error={!!error}>
                    <FormLabel>{label}</FormLabel>
                    <RadioGroup>
                        {options?.map((option) => (
                            <FormControlLabel
                                className="text-black"
                                key={option.id}
                                value={option.id}
                                label={option.label}
                                control={
                                    <Radio
                                        checked={field.value === option.id}
                                    />
                                }
                            />
                        ))}
                    </RadioGroup>
                </FormControl>
            )}
        />
    );
};

export default RHFRadioGroup;
