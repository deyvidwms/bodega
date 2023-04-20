import { Request, Response } from "express";
import CustomRequest from "../arquitetura/customRequest";
import Produto from "../entidade/Produto";
import ProdutoServico from "../servico/produtoServico";

class ProdutoControle {
  private static servico = new ProdutoServico();

  todos(_: CustomRequest<Produto>, res: Response): void {
    ProdutoControle.servico.todos()
      .then((response) => res.status(200).json({ produtos: response }))
      .catch(() => res.status(200).json({ produtos: [] }));
  }

  porId(req: Request, res: Response): void {
    ProdutoControle.servico.porId(Number(req.params.id))
      .then((produto) => {
        if (produto == null) {
          res.status(404).send();
          return;
        }

        res.status(201).json({ produto })
      });
  }

  criar(req: CustomRequest<Produto>, res: Response): void {
    ProdutoControle.servico.criar(req.body)
      .then((produto) => { res.status(201).json({ produto }) });
  }

  atualizar(req: CustomRequest<Produto>, res: Response): void {
    ProdutoControle.servico.atualizar(req.body)
      .then((produto) => { res.status(201).json({ produto }) });
  }

  remover(req: Request, res: Response): void {
    ProdutoControle.servico.remover(Number(req.params.id))
      .then((produto) => { res.status(200).json({ produto }) });
  }

  produtosComBaixoEstoque(req: Request, res: Response): void {
    ProdutoControle.servico.produtosComBaixoEstoque(Number(req.params.limite))
      .then((response) => res.status(200).json({ produtos: response }))
      .catch(() => res.status(200).json({ produtos: [] }));
  }
}

export default ProdutoControle;
