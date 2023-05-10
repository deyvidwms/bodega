export default interface ServicoEscrita<T> {
  validarCadastro(entidade: T): void;
  validarAtualizacao(entidade: T): void;

  criar(entidade: T): Promise<T>;
  atualizar(entidade: T): Promise<T>;
}
