import React from 'react';

import { Container } from './styles';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

type Props = {
  name: string;
  label: string;
  options: {
    id: number;
    name: string; 
    value: string;
  }[]
  required?: boolean;
  style?: React.CSSProperties | undefined;
}


const SelectFieldElement: React.FC<Props> = ({ name, label, options, required, style }) => {
  const { watch, control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Container>
          <FormControl fullWidth>
            <InputLabel id={`${name}Label`}>{label}</InputLabel>
            <Select
              labelId={`${name}Label`}
              id={`${name}Select`}
              value={field.value? field.value : 0}
              label={label}
              onChange={event => field.onChange(event)}
              required={required}
            >
              {
                options.map( element => 
                  <MenuItem 
                    key={element.id}
                    value={element.value}
                  >
                    {element.name}
                  </MenuItem>
                )
              }
            </Select>
          </FormControl>
        </Container>
      )}
    />
  );
}

export default SelectFieldElement;