import * as yup from "yup";

export const validationSchemaSell = yup
  .object()
  .shape({
    idCliente: yup
      .string(),
    // fiado: yup
    //   .string()
    //   .required("Selecione uma opção válida"),
  })
  .required();