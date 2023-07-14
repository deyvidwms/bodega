import { Comercio, Lote, Produto, Venda } from "@prisma/client";
import * as ExcelJS from 'exceljs';
import fs from 'fs';

import ServicoEscrita from "../arquitetura/ServicoEscrita";
import ComercioRepositorio from "../repositorio/ComercioRepositorio";
import ProdutoRepositorio from "../repositorio/ProdutoRepositorio";
import RelatorioFinanceiro from "../arquitetura/RelatorioFinanceiro";
import RelatorioFinanceiroBodega from "../../instancia/bodega/servico/RelatorioFinanceiroBodega";
import ValidadorEntidade from "../validacao/ValidadorEntidade";
import Validacao from "../validacao/Validacao";
import { Decimal } from "@prisma/client/runtime";


export default class ComercioServico implements ServicoEscrita<Comercio> {
  private static repositorio = new ComercioRepositorio();
  private static produtoRepositorio = new ProdutoRepositorio();

  private static relatorioFinanceiro: RelatorioFinanceiro = new RelatorioFinanceiroBodega();

  private static validadorComercio = new ValidadorEntidade(
    {
      'nome': Validacao.nome,
      'descricao': Validacao.vazio,
      'cnpj': Validacao.cnpj,
      'imagem': Validacao.vazio,
    },
    {
      'cnpj': (cnpj) => Validacao.valorUnico(cnpj, ComercioServico.repositorio.porCnpj),
    }
  );

  private static validadorRelatorioFinanceiro = new ValidadorEntidade(
    {
      'inicio': Validacao.data,
      'fim': Validacao.data,
    },
    {
      'idComercio': (id) => Validacao.entidadeFoiInformada(id, ComercioServico.repositorio.porId, true),
    }
  );

  validarCadastro(comercio: Comercio): Promise<void> {
    return ComercioServico.validadorComercio.validar(comercio, false);
  }

  validarAtualizacao(comercio: Comercio): Promise<void> {
    return ComercioServico.validadorComercio.validar(comercio, true);
  }

  todos(): Promise<Comercio[]> {
    return ComercioServico.repositorio.todos();
  }

  porId(id: number): Promise<Comercio | null> {
    return ComercioServico.repositorio.porId(id);
  }

  async criar(comercio: Comercio): Promise<Comercio> {
    await this.validarCadastro(comercio);
    return await ComercioServico.repositorio.criar(comercio);
  }

  async atualizar(comercio: Comercio): Promise<Comercio> {
    await this.validarAtualizacao(comercio);
    return await ComercioServico.repositorio.atualizar(comercio);
  }

  remover(id: number): Promise<Comercio | null> {
    return ComercioServico.repositorio.remover(id);
  }

  encarte(id: number): Promise<(Produto & { lotes: Lote[]; })[]> {
    return ComercioServico.produtoRepositorio.encarte(id);
  }

  private gerarRelatorioFinanceiro (dadosRelatorio: { 
    compras: Lote[], 
    vendas: Venda[], 
    lucro: Decimal, 
    despesa: Decimal, 
    receita: Decimal  
  }) {
    const filePath = '../../../reports/relatorio.xlsx';

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Relatório');

    worksheet.getCell('A1').value = 'Nome';
    worksheet.getCell('B1').value = 'Idade';
    worksheet.getCell('A2').value = 'John Doe 2';
    worksheet.getCell('B2').value = 30;
    
    workbook.xlsx.writeFile(filePath)
      .then(() => {
        console.log('Relatório gerado com sucesso!');
      })
      .catch((error) => {
        console.error('Erro ao gerar o relatório:', error);
      });

    return { 'link': 'http://localhost:3000/reports/relatorio.xlsx' };
  }

  async relatorioFinanceiro(idComercio: number, inicio: Date, fim: Date) {
    await ComercioServico.validadorRelatorioFinanceiro.validar({ inicio, fim, idComercio }, false);
    const dadosRelatorio = await ComercioServico.relatorioFinanceiro.calcularRelatorio(idComercio, inicio, fim);
    return this.gerarRelatorioFinanceiro(dadosRelatorio);
  }
}
