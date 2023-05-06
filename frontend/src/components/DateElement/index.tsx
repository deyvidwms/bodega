import React, { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import ptBR from "dayjs/locale/pt-br";
import { LocalizationProvider, DesktopDatePicker } from "@mui/x-date-pickers";
import { TextField } from "@mui/material";
import { Masks } from "../../assets/ts/Masks"; 

// import { Container } from './styles';

const DateElement: React.FC<{isMobile: boolean, name: string, label: string, required: boolean}> = ({ isMobile, name, label, required }) => {
  const { watch, setValue, control } = useFormContext();

  const [date, setDate] = useState<Dayjs | null>(
    watch(name) || null
  );
  const [mobileDate, setMobileDate] = useState<string | null>(
    watch(`${name}Text`) || null
  );
  return (
    <>
      {!isMobile ? (
        <Controller
          name={name}
          control={control}
          render={({ field, fieldState }) => (
            <LocalizationProvider
              adapterLocale={ptBR}
              dateAdapter={AdapterDayjs}
            >
              <DesktopDatePicker
                {...field}
                label={label}
                // inputFormat="DD/MM/YYYY"
                value={date}
                onChange={(event, newValue) => {
                  setDate(dayjs(event));
                  setValue(name, dayjs(event));
                  setValue(
                    `${name}Text`,
                    dayjs(event).format("DD/MM/YYYY")
                  );
                }}
                // renderInput={(params) => (
                //   <TextField
                //     {...params}
                //     id={name}
                //     error={!!fieldState.error}
                //     helperText={fieldState.error?.message}
                //     required
                //     sx={{ width: "100%" }}
                //   />
                // )}
              />
            </LocalizationProvider>
          )}
        />
      ) : (
        <Controller
          name={name}
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              label={label}
              id={name}
              variant="outlined"
              placeholder="dd/mm/yyyy"
              fullWidth
              required
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(event) => {
                setMobileDate(Masks.date(event));
                if (event.target.value.length === 10) {
                  const changedDate = `${event.target.value.split("/")[2]}-${
                    event.target.value.split("/")[1]
                  }-${event.target.value.split("/")[0]}`;
                  setDate(dayjs(changedDate));
                  setValue("name", dayjs(changedDate));
                  setValue("nameText", Masks.date(event));
                }
              }}
              value={mobileDate || ""}
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />
      )}
    </>
  );
};

export default DateElement;