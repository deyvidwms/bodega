import * as yup from "yup";

const FILE_SIZE = 1048576 * Number(process.env.REACT_APP_SIZE_FILES);
const SUPPORTED_FORMATS = [
  "image/jpg",
  "image/jpeg",
  "image/gif",
  "image/bmp",
  "image/png",
];

export const validationSchemaProduct = yup
  .object()
  .shape({
    titulo: yup
      .string()
      .required("O campo acima é obrigatório"),
    descricao: yup
      .string()
      .required("O campo acima é obrigatório"),
    imagem: yup
      .mixed()
      .required('O campo acima é obrigatório'),
    idCategoriaProduto: yup.string().required("Selecione uma opção válida"),
  })
  .required();