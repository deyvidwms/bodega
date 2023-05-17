import * as yup from "yup";

export const validationSchemaProduct = yup
  .object()
  .shape({
    idLote: yup
      .string()
      .required("Selecione uma opção válida"),
    quantidade: yup
      .string()
      .required("O campo acima é obrigatório")
      .test(
        "invalidValue",
        "O valor deve ser maior que 0",
        (value) => value !== undefined && Number(value) > 0 
      ),
  })
  .required();