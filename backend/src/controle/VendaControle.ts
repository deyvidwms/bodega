import { Request, Response } from "express";
import CustomRequest from "../arquitetura/CustomRequest";
import Venda from "../entidade/Venda";
import VendaServico from "../servico/VendaServico";
import ErroNegocio from "../arquitetura/ErroNegocio";

class VendaControle {
  private static servico = new VendaServico();

  async todos(_: CustomRequest<Venda>, res: Response): Promise<void> {
    const vendas = await VendaControle.servico.todos();
    res.status(201).json(vendas == null ? [] : vendas);
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

  async criar(req: CustomRequest<Venda>, res: Response): Promise<void> {
    try {
      const venda = await VendaControle.servico.criar(req.body);
      res.status(201).json(venda);
    } catch (e) {
      if (e instanceof ErroNegocio) {
        res.status(400).json({ erros: e.getErros() })
      }
    }
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
