import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchemaClient } from '../../schemas/validationSchema/Cliente';
import { validationSchemaProduct } from '../../schemas/validationSchema/Produto';

import { ButtonsList, Container, ProductRegisterForm, Title } from './styles';
import { Button } from '@mui/material';

import { FormValues } from '../../types/FormValues';
import { FaCheckCircle } from 'react-icons/fa';
import { SuccessMessage } from '../../pages/Dashboard/Produto/styles';

type Props = {
  title: string;
  children: React.ReactNode;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  currentSchema: number;
};

const validationSchemas = [
  validationSchemaClient,
  validationSchemaProduct
];

const SideBarForm: React.FC<Props> = ({title, children, show, setShow, currentSchema}) => {
  const [success, setSuccess] = useState<boolean>(false);

  const methods = useForm<FormValues>({
    resolver: yupResolver(validationSchemas[currentSchema]),
  });

  const handleClickCancel = () => {
    methods.reset()
    setShow(false);
    setTimeout(() => {
      setSuccess(false);
    }, 300)
  }

  const onSubmitHandler = (values: FormValues) => {
    console.log("valores", values);
    setSuccess(true);
    setTimeout(() => {
      handleClickCancel();
    }, 3000)
  };

  return (
    <Container show={show}>
      { !success && <Title>Cadastro de {title}</Title> }
      {
        !success &&
        <ProductRegisterForm
            noValidate
            autoComplete="off"
            onSubmit={methods.handleSubmit(onSubmitHandler)}
        >
          <FormProvider {...methods}>
            {children}

            <ButtonsList>
              <Button 
                variant="outlined" 
                sx={{color: '#999', borderColor: '#999'}}
                onClick={handleClickCancel}
              >
                Cancelar
              </Button>
              <Button 
                variant="contained" 
                color="success"
                type='submit'
              >
                Cadastrar
              </Button>
            </ButtonsList>
          </FormProvider>
        </ProductRegisterForm>
      }
      {
        success && 
        <SuccessMessage>
          <FaCheckCircle />
          <p><span>{title.substring(0, title.length-1)}</span> cadastrado com sucesso!</p>
        </SuccessMessage>
      }
    </Container>
  );
}

export default SideBarForm;