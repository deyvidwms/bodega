import React from "react";

import { Controller, useFormContext } from "react-hook-form";

import { Autocomplete, TextField } from "@mui/material";
import { Container } from "./styles";

type Option = {
  id : number;
  nome: string;
}

type Props = {
  options: Option[];
  name: string;
  label: string;
  required?: boolean;
}

const AutoCompleteElement: React.FC<Props> = ({options, name, label, required}) => {
  const { watch, control } = useFormContext();

  const previousValue = options.find(
    (value: Option) => value.id === watch(name)
  );

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        return (
          <Container>
            <Autocomplete
              {...field}
              disabled={!options.length}
              id={name}
              options={options}
              getOptionLabel={(option) => option.nome}
              value={previousValue || null}
              isOptionEqualToValue={(option, value) => option.nome === value.nome}
              noOptionsText="Nenhuma informação encontrada"
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={label}
                  variant="outlined"
                  required={required}
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
              onChange={(_, data) => {
                data ? field.onChange(data.id) : field.onChange(undefined);
              }}
            />
          </Container>
        );
      }}
    />
  );
}

export default AutoCompleteElement;