import { NextFunction, Request, Response } from "express";
import UsuarioServico from "../servico/UsuarioServico";

import jwt from 'jsonwebtoken';

export default class UsuarioControle {
  private static servico = new UsuarioServico();

  todos(_: Request, res: Response): void {
    UsuarioControle.servico.todos()
      .then((entidades) => { res.status(201).json(entidades); });
  }

  porId(req: Request, res: Response, next: NextFunction): void {
    UsuarioControle.servico.porId(Number(req.params.id))
      .then((entidade) => {
        if (entidade == null) {
          res.status(404).send();
        } else {
          res.status(201).json(entidade);
        }
      })
      .catch(next);
  }

  criar(req: Request, res: Response, next: NextFunction): void {
    UsuarioControle.servico.criar(req.body)
      .then((entidade) => { res.status(201).json(entidade); })
      .catch(next);
  }

  atualizar(req: Request, res: Response, next: NextFunction): void {
    UsuarioControle.servico.atualizar(req.body)
      .then((entidade) => { res.status(201).json(entidade); })
      .catch(next);
  }

  remover(req: Request, res: Response, next: NextFunction): void {
    UsuarioControle.servico.remover(Number(req.params.id))
      .then((entidade) => { res.status(200).json(entidade); })
      .catch(next);
  }

  public static login(req: Request, res: Response, next: NextFunction): void {
    UsuarioControle.servico.login(req.body.email, req.body.senha)
      .then((resultado) => {
        if (typeof resultado !== 'number') {
          res.status(500).json({ message: 'Login inválido!' });
        }

        const chave = process.env.TOKEN_PASS;
        if (chave === undefined) {
          return res.status(500);
        }

        const token = jwt.sign({ id: resultado }, chave, {
          expiresIn: 300 // 5 min
        });

        return res.json({ autenticado: true, token: token });
      })
      .catch(next);
  }
}
