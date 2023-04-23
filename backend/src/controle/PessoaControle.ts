import { Request, Response } from "express";
import CustomRequest from "../arquitetura/CustomRequest";
import Pessoa from "../entidade/Pessoa";
import PessoaServico from "../servico/PessoaServico";

class PessoaControle {
  private static servico = new PessoaServico();

  todos(_: CustomRequest<Pessoa>, res: Response): void {
    PessoaControle.servico.todos()
      .then((response) => res.status(200).json({ pessoas: response }))
      .catch(() => res.status(200).json({ pessoas: [] }));
  }

  porId(req: Request, res: Response): void {
    PessoaControle.servico.porId(Number(req.params.id))
      .then((pessoa) => {
        if (pessoa == null) {
          res.status(404).send();
          return;
        }

        res.status(201).json({ pessoa })
      });
  }

  criar(req: CustomRequest<Pessoa>, res: Response): void {
    PessoaControle.servico.criar(req.body)
      .then((pessoa) => { res.status(201).json({ pessoa }) });
  }

  atualizar(req: CustomRequest<Pessoa>, res: Response): void {
    PessoaControle.servico.atualizar(req.body)
      .then((pessoa) => { res.status(201).json({ pessoa }) });
  }

  remover(req: Request, res: Response): void {
    PessoaControle.servico.remover(Number(req.params.id))
      .then((pessoa) => { res.status(200).json({ pessoa }) });
  }
}

export default PessoaControle;
