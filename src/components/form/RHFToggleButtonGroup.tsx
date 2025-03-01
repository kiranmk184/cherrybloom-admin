import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { Option } from "../../utils/types/option";

type Props<T extends FieldValues> = {
    name: Path<T>;
    options?: Option[];
};

const RHFToggleButtonGroup = <T extends FieldValues>({
    name,
    options,
}: Props<T>) => {
    const { control } = useFormContext();

    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { onChange, value } }) => (
                <ToggleButtonGroup
                    onChange={(_, value) => {
                        if (value.length) {
                            onChange(value);
                        }
                    }}
                    value={value.length ? value : [options?.[0].id]}
                >
                    {options?.map((option) => (
                        <ToggleButton value={option.id} key={option.id}>
                            {option.label}
                        </ToggleButton>
                    ))}
                </ToggleButtonGroup>
            )}
        />
    );
};

export default RHFToggleButtonGroup;
