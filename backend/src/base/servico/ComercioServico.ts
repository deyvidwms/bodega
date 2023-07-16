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

  private gerarRelatorioFinanceiro(dadosRelatorio: {
    compras: Lote[],
    vendas: Venda[],
    lucro: Decimal,
    despesa: Decimal,
    receita: Decimal
  }) {
    console.log('Dados do relatorio',dadosRelatorio);

    const filePath = 'reports/relatorio.xlsx';

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Relatório');

    const defaultAlignments: Partial<ExcelJS.Alignment> = { 
      vertical: 'middle', 
      horizontal: 'center' 
    };

    const defaultBorders: Partial<ExcelJS.Borders> = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };

    const cellA1 = worksheet.getCell('A1');
    cellA1.value = 'VENDAS';
    cellA1.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '0BE6B0' }
    };
    cellA1.font = {
      bold: true,
      color: { argb: 'FFFFFF' }
    };
    cellA1.alignment = defaultAlignments;
    cellA1.border = defaultBorders;

    worksheet.getColumn('A').width = 15;
    worksheet.getColumn('B').width = 15;
    worksheet.getColumn('C').width = 15;

    worksheet.mergeCells('A1:C1');


    const cellA2 = worksheet.getCell('A2');
    cellA2.value = 'Quantidade';
    cellA2.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'CCCCCC' }
    };
    cellA2.font = {
      bold: true,
      color: { argb: 'FFFFFF' }
    };
    cellA2.alignment = defaultAlignments;
    cellA2.border = defaultBorders;

    const cellB2 = worksheet.getCell('B2');
    cellB2.value = 'Comprado em';
    cellB2.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'CCCCCC' }
    };
    cellB2.font = {
      bold: true,
      color: { argb: 'FFFFFF' }
    };
    cellB2.alignment = defaultAlignments;
    cellB2.border = defaultBorders;

    const cellC2 = worksheet.getCell('C2');
    cellC2.value = 'Custo';
    cellC2.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'CCCCCC' }
    };
    cellC2.font = {
      bold: true,
      color: { argb: 'FFFFFF' }
    };
    cellC2.alignment = defaultAlignments;
    cellC2.border = defaultBorders;

    // insere os dados de vendas
    const vendas = dadosRelatorio.vendas;

    vendas.map((venda, index) => {
      const row = (index+2)+1;

      const cellA = worksheet.getCell(`A${row}`);
      cellA.value = 'QTD.';
      
      const cellB = worksheet.getCell(`B${row}`);
      cellB.value = `${new Date(String(venda.vendidoEm).substring(0,10)).toLocaleDateString()}`;

      const cellC = worksheet.getCell(`C${row}`);
      cellC.value = 'Custo';
    });


    const cellD1 = worksheet.getCell('D1');
    cellD1.value = 'COMPRAS';
    cellD1.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '0E0DE6' }
    };
    cellD1.font = {
      bold: true,
      color: { argb: 'FFFFFF' }
    };
    cellD1.alignment = defaultAlignments;
    cellD1.border = defaultBorders;
    
    worksheet.getColumn('D').width = 15;
    worksheet.getColumn('E').width = 15;
    worksheet.getColumn('F').width = 15;
    
    worksheet.mergeCells('D1:F1');

    // insere os dados de compras
    const compras = dadosRelatorio.compras;

    console.log('compras', compras)
    compras.map((compra, index) => {
      const row = (index+2)+1;
      console.log('row', row);

      const cellA = worksheet.getCell(`D${row}`);
      cellA.value = `${compra.quantidadeInicial}`;
      
      const cellB = worksheet.getCell(`E${row}`);
      cellB.value = `${new Date(String(compra.compradoEm).substring(0,10)).toLocaleDateString()}`;

      const cellC = worksheet.getCell(`F${row}`);
      const custo = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format( Number(compra.custo) );
      cellC.value = `${custo}`;
    });

    const cellD2 = worksheet.getCell('D2');
    cellD2.value = 'Quantidade';
    cellD2.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'CCCCCC' }
    };
    cellD2.font = {
      bold: true,
      color: { argb: 'FFFFFF' }
    };
    cellD2.alignment = defaultAlignments;
    cellD2.border = defaultBorders;

    const cellE2 = worksheet.getCell('E2');
    cellE2.value = 'Comprado em';
    cellE2.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'CCCCCC' }
    };
    cellE2.font = {
      bold: true,
      color: { argb: 'FFFFFF' }
    };
    cellE2.alignment = defaultAlignments;
    cellE2.border = defaultBorders;

    const cellF2 = worksheet.getCell('F2');
    cellF2.value = 'Custo';
    cellF2.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'CCCCCC' }
    };
    cellF2.font = {
      bold: true,
      color: { argb: 'FFFFFF' }
    };
    cellF2.alignment = defaultAlignments;
    cellF2.border = defaultBorders;


    worksheet.getColumn('H').width = 15;
  
    const cellH2 = worksheet.getCell('H2');
    cellH2.value = 'RECEITA';
    cellH2.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '50E600' }
    };
    cellH2.font = {
      bold: true,
      color: { argb: '000000' }
    };
    cellH2.alignment = defaultAlignments;
    cellH2.border = defaultBorders;

    const cellI2 = worksheet.getCell('I2');
    const receita = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format( Number(dadosRelatorio.receita) );
    cellI2.value = receita;

    const cellH3 = worksheet.getCell('H3');
    cellH3.value = 'DESPESA';
    cellH3.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'E64917' }
    };
    cellH3.font = {
      bold: true,
      color: { argb: '000000' }
    };
    cellH3.alignment = defaultAlignments;
    cellH3.border = defaultBorders;

    const cellI3 = worksheet.getCell('I3');
    const despesa = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format( Number(dadosRelatorio.despesa) );
    cellI3.value = despesa;

    const cellH4 = worksheet.getCell('H4');
    cellH4.value = 'LUCRO';
    cellH4.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'E6BF10' }
    };
    cellH4.font = {
      bold: true,
      color: { argb: '000000' }
    };
    cellH4.alignment = defaultAlignments;
    cellH4.border = defaultBorders;

    const cellI4 = worksheet.getCell('I4');
    const lucro = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format( Number(dadosRelatorio.lucro) );
    cellI4.value = lucro;

    const cellI1 = worksheet.getCell('I1');
    cellI1.value = 'RESUMO';
    cellI1.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '999999' }
    };
    cellI1.font = {
      bold: true,
      color: { argb: '000000' }
    };
    cellI1.alignment = defaultAlignments;
    cellI1.border = defaultBorders;

    worksheet.getColumn('I').width = 15;
    

    workbook.xlsx.writeFile(filePath)
      .then(() => {
        console.log('Relatório gerado com sucesso!');
      })
      .catch((error: any) => {
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
