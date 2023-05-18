import * as yup from "yup";

export const validationSchemaSell = yup
  .object()
  .shape({
    idCliente: yup
      .string(),
  })
  .required();