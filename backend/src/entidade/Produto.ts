type Produto = {
  id: number;
  titulo: string;
  descricao: string;
  imagem: string;
  idCriador: number | null;
  idBodega: number | null;
}

export default Produto;
