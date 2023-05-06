export default interface ValidadorEntidade {
  [key: string]: (valor: any) => string | null;
}
