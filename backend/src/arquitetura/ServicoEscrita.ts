export default interface ServicoEscrita<T> {
  validar(entidade: T): void;
  criar(entidade: T): Promise<T>;
  atualizar(entidade: T): Promise<T>;
}
