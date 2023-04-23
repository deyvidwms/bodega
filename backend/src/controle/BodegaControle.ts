import { Request, Response } from "express";
import CustomRequest from "../arquitetura/CustomRequest";
import Bodega from "../entidade/Bodega";
import BodegaServico from "../servico/BodegaServico";

class BodegaControle {
  private static servico = new BodegaServico();

  todos(_: CustomRequest<Bodega>, res: Response): void {
    BodegaControle.servico.todos()
      .then((response) => res.status(200).json({ bodegas: response }))
      .catch(() => res.status(200).json({ bodegas: [] }));
  }

  porId(req: Request, res: Response): void {
    BodegaControle.servico.porId(Number(req.params.id))
      .then((bodega) => {
        if (bodega == null) {
          res.status(404).send();
          return;
        }

        res.status(201).json({ bodega })
      });
  }

  criar(req: CustomRequest<Bodega>, res: Response): void {
    BodegaControle.servico.criar(req.body)
      .then((bodega) => { res.status(201).json({ bodega }) });
  }

  atualizar(req: CustomRequest<Bodega>, res: Response): void {
    BodegaControle.servico.atualizar(req.body)
      .then((bodega) => { res.status(201).json({ bodega }) });
  }

  remover(req: Request, res: Response): void {
    BodegaControle.servico.remover(Number(req.params.id))
      .then((bodega) => { res.status(200).json({ bodega }) });
  }

  relatorioFinanceiro(req: Request, res: Response): void {
    BodegaControle.servico.relatorioFinanceiro(req.body.inicio, req.body.fim)
      .then((relatorioFinanceiro) => { res.status(200).json({ relatorioFinanceiro }) });
  }

  recomendacaoCliente(req: Request, res: Response): void {
    BodegaControle.servico.recomendacaoCliente(req.body.cpf)
      .then((recomendacaoCliente) => { res.status(200).json({ recomendacaoCliente }) });
  }
}

export default BodegaControle;
