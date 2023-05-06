import React from 'react';

import { Container } from './styles';
import { Controller, useFormContext } from 'react-hook-form';
import { MuiFileInput } from 'mui-file-input';
import { FormLabel } from '@mui/material';

type Props = {
  name: string;
  label: string;
  required?: boolean;
}

const FileFieldElement: React.FC<Props> = ({name, label, required}) => {
  const { watch, control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({field, fieldState})=> (
        <Container style={{marginTop: 0}}>
          <FormLabel component="legend" sx={{mb: 1}}>Imagem do produto</FormLabel>
          <MuiFileInput
            onChange={(event) => field.onChange(event)}
            value={watch(name) || ""}
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
          />
        </Container>
      )}
    />
  );
}

export default FileFieldElement;