import React, { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

import dayjs, { Dayjs } from "dayjs";

import { TextField } from "@mui/material";
import { Masks } from "../../assets/ts/Masks"; 
import { Container } from "./styles";

const DateElement: React.FC<{name: string, label: string, required: boolean}> = ({ name, label, required }) => {
  const { watch, setValue, control } = useFormContext();

  return (
    <>
      <Container>
        <Controller
          name={name}
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
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
                field.onChange(Masks.date(event));
              }}
              value={watch(name) || ""}
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />
      </Container>
    </>
  );
};

export default DateElement;