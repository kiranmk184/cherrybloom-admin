import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import { Option } from "../../utils/types/option";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DateRangePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";

type Props<T extends FieldValues> = {
    name: Path<T>;
    label: string;
    options?: Option[];
};

const RHFDateRangePicker = <T extends FieldValues>({
    name,
    label,
    options,
}: Props<T>) => {
    const { control } = useFormContext();

    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { value, ...restField } }) => (
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateRangePicker dateAdapter={AdapterDateFns}>
                        <DateRangePicker
                            className="text-black"
                            {...restField}
                            value={Array.isArray(value) ? value : [null, null]}
                        />
                    </DateRangePicker>
                </LocalizationProvider>
            )}
        />
    );
};

export default RHFDateRangePicker;
