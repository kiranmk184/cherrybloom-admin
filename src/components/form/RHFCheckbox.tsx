import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import { Option } from "../../utils/types/option";
import {
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormHelperText,
    FormLabel,
} from "@mui/material";

type Props<T extends FieldValues> = {
    name: Path<T>;
    label: string;
    options?: Option[];
};

const RHFCheckbox = <T extends FieldValues>({
    name,
    label,
    options,
}: Props<T>) => {
    const { control } = useFormContext();

    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
                <FormControl error={!!error}>
                    <FormLabel>{label}</FormLabel>
                    <FormGroup>
                        {options?.map((option) => (
                            <FormControlLabel
                                className="text-black"
                                key={option.id}
                                label={option.label}
                                control={
                                    <Checkbox
                                        key={option.id}
                                        checked={value.includes(option.id)}
                                        onChange={() => {
                                            if (value.includes(option.id)) {
                                                onChange(
                                                    (value as string[]).filter(
                                                        (item) =>
                                                            item !== option.id
                                                    )
                                                );
                                            } else {
                                                onChange([...value, option.id]);
                                            }
                                        }}
                                    />
                                }
                            />
                        ))}
                    </FormGroup>
                    <FormHelperText>{error?.message}</FormHelperText>
                </FormControl>
            )}
        />
    );
};

export default RHFCheckbox;
