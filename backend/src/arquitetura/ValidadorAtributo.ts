export default interface ValidadorAtributo {
  [key: string]: (valor: any) => string | null;
}
