import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import { Option } from "../../utils/types/option";
import { Autocomplete, Box, Checkbox, TextField } from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

type Props<T extends FieldValues> = {
    name: Path<T>;
    label: string;
    options?: Option[];
};

const RHFAutocomplete = <T extends FieldValues>({
    name,
    label,
    options,
}: Props<T>) => {
    const { control } = useFormContext();

    return (
        <Controller
            control={control}
            name={name}
            render={({
                field: { value, onChange, ref },
                fieldState: { error },
            }) => (
                <Autocomplete
                    options={options || []}
                    value={value.map((id: string) => {
                        options?.find((item) => item.id === id);
                    })}
                    getOptionLabel={(option) =>
                        options?.find((item) => item.id === option.id)?.label ??
                        ""
                    }
                    isOptionEqualToValue={({ option, value }) =>
                        option.id === value.id
                    }
                    onChange={(_, value) =>
                        onChange(value.map((item) => item.id))
                    }
                    disableCloseOnSelect
                    multiple
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            fullWidth
                            inputRef={ref}
                            error={!!error}
                            helperText={error?.message}
                            label={label}
                        />
                    )}
                    renderOption={(props, option, { selected }) => (
                        <Box component="li" {...props}>
                            <Checkbox
                                icon={<CheckBoxOutlineBlankIcon />}
                                checkedIcon={<CheckBoxIcon />}
                                checked={selected}
                            />
                            {option.label}
                        </Box>
                    )}
                />
            )}
        />
    );
};

export default RHFAutocomplete;
