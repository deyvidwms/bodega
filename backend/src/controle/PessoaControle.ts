import { Request, Response } from "express";
import CustomRequest from "../arquitetura/CustomRequest";
import Pessoa from "../entidade/Pessoa";
import PessoaServico from "../servico/PessoaServico";
import ErroNegocio from "../arquitetura/ErroNegocio";

class PessoaControle {
  private static servico = new PessoaServico();

  async todos(_: CustomRequest<Pessoa>, res: Response): Promise<Pessoa[]> {
    const pessoas = await PessoaControle.servico.todos();
    return pessoas;
  }

  async porId(req: Request, res: Response): Promise<void> {
    const pessoa = await PessoaControle.servico.porId(Number(req.params.id));
    if (pessoa == null) {
      res.status(404).send();
      return;
    }

    res.status(201).json({ pessoa });
  }

  async criar(req: CustomRequest<Pessoa>, res: Response): Promise<void> {
    try {
      const pessoa = await PessoaControle.servico.criar(req.body);
      res.status(201).json({ pessoa });
    } catch (e) {
      if (e instanceof ErroNegocio) {
        res.status(400).json({ erros: e.getErros() })
      }
    }
  }

  async atualizar(req: CustomRequest<Pessoa>, res: Response): Promise<void> {
    try {
      const pessoa = PessoaControle.servico.atualizar(req.body);
      res.status(201).json({ pessoa });
    } catch (e) {
      if (e instanceof ErroNegocio) {
        res.status(400).json({ erros: e.getErros() })
      }
    }
  }

  async remover(req: Request, res: Response): Promise<void> {
    const pessoa = PessoaControle.servico.remover(Number(req.params.id));
    res.status(200).json({ pessoa });
  }
}

export default PessoaControle;
