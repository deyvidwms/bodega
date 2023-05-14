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
      .required()
      .test("fileRequired", "É obrigatório anexar a selfie.", (value) => value !== undefined)
      // .test(
      //   "fileSize",
      //   `O arquivo é muito grande. Anexe um de até ${process.env.REACT_APP_SIZE_FILES}mb`,
      //   (value) => {
      //     value && value?.size && value.size <= FILE_SIZE 
      //   }
      // )
      // .test(
      //   "fileType",
      //   "O formato do arquivo deve ser: JPG, JPEG, GIF, BMP ou PNG.",
      //   (value) => {
      //     console.log('fileType', value.type);
      //     return true;
      //     // value[0] && SUPPORTED_FORMATS.includes(value[0].type)
      //   }
      // )
      .default([]),
    idCategoriaProduto: yup.string().required("Selecione uma opção válida"),
  })
  .required();

export const validationSchemaProductEdit = yup
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
      .required()
      .test("fileRequired", "É obrigatório anexar a selfie.", (value) => value !== undefined)
      // .test(
      //   "fileSize",
      //   `O arquivo é muito grande. Anexe um de até ${process.env.REACT_APP_SIZE_FILES}mb`,
      //   (value) => {
      //     value && value?.size && value.size <= FILE_SIZE 
      //   }
      // )
      // .test(
      //   "fileType",
      //   "O formato do arquivo deve ser: JPG, JPEG, GIF, BMP ou PNG.",
      //   (value) => {
      //     console.log('fileType', value.type);
      //     return true;
      //     // value[0] && SUPPORTED_FORMATS.includes(value[0].type)
      //   }
      // )
      .default([]),
    idCategoriaProduto: yup.string().required("Selecione uma opção válida"),
  })
  .required()