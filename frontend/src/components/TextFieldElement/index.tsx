import { TextField } from '@mui/material';
import React from 'react';

import { Container } from './styles';
import { Controller, useFormContext } from 'react-hook-form';

type Props = {
  maskFunction?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => string;
  name: string;
  label: string;
  required?: boolean;
}

  const TextFieldElement: React.FC<Props> = ({maskFunction, name, label, required}) => {
  const { watch, control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({field, fieldState})=>(
        <Container>
          <TextField
            {...field}
            variant='outlined'
            label={label}
            id={name}
            required={required}
            size='medium'
            fullWidth
            onChange={(event) => {
              if (event.target)
                event.target.value = event.target.value?.toString().toUpperCase();
              else if (event.currentTarget.value)
                event.currentTarget.value = event.currentTarget.value
                  ?.toString()
                  .toUpperCase();
  
              field.onChange(maskFunction ? maskFunction(event) : event);
            }}
            value={watch(name) || ""}
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
          />
        </Container>
      )}
    />
  );
}

export default TextFieldElement;