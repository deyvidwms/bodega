import { Request, Response } from "express";
import CustomRequest from "../arquitetura/customRequest";
import Venda from "../entidade/Venda";
import VendaServico from "../servico/vendaServico";

class VendaControle {
  private static servico = new VendaServico();

  todos(_: CustomRequest<Venda>, res: Response): void {
    VendaControle.servico.todos()
      .then((response) => res.status(200).json({ vendas: response }))
      .catch(() => res.status(200).json({ vendas: [] }));
  }

  porId(req: Request, res: Response): void {
    VendaControle.servico.porId(Number(req.params.id))
      .then((venda) => {
        if (venda == null) {
          res.status(404).send();
          return;
        }

        res.status(201).json({ venda })
      });
  }

  criar(req: CustomRequest<Venda>, res: Response): void {
    VendaControle.servico.criar(req.body)
      .then((venda) => { res.status(201).json({ venda }) });
  }

  atualizar(req: CustomRequest<Venda>, res: Response): void {
    VendaControle.servico.atualizar(req.body)
      .then((venda) => { res.status(201).json({ venda }) });
  }

  remover(req: Request, res: Response): void {
    VendaControle.servico.remover(Number(req.params.id))
      .then((venda) => { res.status(200).json({ venda }) });
  }
}

export default VendaControle;
