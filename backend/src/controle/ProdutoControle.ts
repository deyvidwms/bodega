import { Request, Response } from "express";
import CustomRequest from "../arquitetura/CustomRequest";
import Produto from "../entidade/Produto";
import ProdutoServico from "../servico/ProdutoServico";
import ErroNegocio from "../arquitetura/ErroNegocio";

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

  async criar(req: CustomRequest<Produto>, res: Response): Promise<void> {
    try {
      const produto = await ProdutoControle.servico.criar(req.body);
      res.status(201).json({ produto });
    } catch (e) {
      if (e instanceof ErroNegocio) {
        res.status(400).json({ erros: e.getErros() })
      }
    }
  }

  async atualizar(req: CustomRequest<Produto>, res: Response): Promise<void> {
    try {
      const produto = await ProdutoControle.servico.atualizar(req.body);
      res.status(201).json({ produto });
    } catch (e) {
      if (e instanceof ErroNegocio) {
        res.status(400).json({ erros: e.getErros() })
      }
    }
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
