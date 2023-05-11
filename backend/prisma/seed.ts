import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

const pessoasList = [
  {
    nome: "João da Silva",
    cpf: "105.497.540-08",
    celular: "(11) 99999-9999"
  },
  {
    nome: "Maria Oliveira",
    cpf: "434.012.120-79",
    celular: "(11) 99999-9998"
  },
  {
    nome: "Pedro Santos",
    cpf: "690.128.200-14",
    celular: "(11) 99999-9997"
  },
  {
    nome: "Ana Souza",
    cpf: "735.704.120-40",
    celular: "(11) 99999-9996"
  },
  {
    nome: "Lucas Almeida",
    cpf: "898.026.400-34",
    celular: "(11) 99999-9995"
  },
  {
    nome: "Carla Ferreira",
    cpf: "476.551.840-03",
    celular: "(11) 99999-9994"
  },
  {
    nome: "Paulo Ribeiro",
    cpf: "404.249.170-76",
    celular: "(11) 99999-9993"
  },
  {
    nome: "Isabela Nogueira",
    cpf: "039.614.080-74",
    celular: "(11) 99999-9992"
  },
  {
    nome: "Maurício Costa",
    cpf: "971.942.850-37",
    celular: "(11) 99999-9991"
  },
  {
    nome: "Camila Silva",
    cpf: "063.683.460-35",
    celular: "(11) 99999-9990"
  }
];

const categoriaProdutoList = [
  {
    nome: "Hortifruti",
    imagem: '',
  },
  {
    nome: "Carnes",
    imagem: '',
  },
  {
    nome: "Peixes e frutos do mar",
    imagem: '',
  },
  {
    nome: "Laticínios",
    imagem: '',
  },
  {
    nome: "Açougue",
    imagem: '',
  },
  {
    nome: "Frios e embutidos",
    imagem: '',
  },
  {
    nome: "Bebidas",
    imagem: '',
  },
  {
    nome: "Doces e sobremesas",
    imagem: '',
  }
];

const produtosList = [
  {
    titulo: "Arroz branco",
    descricao: "Arroz branco tipo 1, 1kg",
    imagem: "https://exemplo.com/arroz_branco.jpg",
    idBodega: 1,
    idCategoriaProduto: 1,
    idCriador: 1
  },
  {
    titulo: "Feijão carioca",
    descricao: "Feijão carioca tipo 1, 1kg",
    imagem: "https://exemplo.com/feijao_carioca.jpg",
    idBodega: 1,
    idCategoriaProduto: 1,
    idCriador: 1
  },
  {
    titulo: "Leite integral",
    descricao: "Leite integral em caixa, 1L",
    imagem: "https://exemplo.com/leite_integral.jpg",
    idBodega: 1,
    idCategoriaProduto: 1,
    idCriador: 1
  },
  {
    titulo: "Pão de forma",
    descricao: "Pão de forma integral, 500g",
    imagem: "https://exemplo.com/pao_de_forma.jpg",
    idBodega: 1,
    idCategoriaProduto: 1,
    idCriador: 1
  },
  {
    titulo: "Óleo de soja",
    descricao: "Óleo de soja refinado, 900ml",
    imagem: "https://exemplo.com/oleo_de_soja.jpg",
    idBodega: 1,
    idCategoriaProduto: 1,
    idCriador: 1
  }
];

async function cadastrarCategoriasProdutos() {
  categoriaProdutoList.forEach((categoriaProduto) => (
    prisma.categoriaProduto.create({ data: categoriaProduto }).catch(error => console.log('error:', error))
  ))
  return true;
}

async function cadastrarProdutos() {
  produtosList.forEach((produto) => (prisma.produto.create({ data: produto }).catch(error => console.log('error:', error))));
}

async function cadastrarPessoas() {
  pessoasList.forEach((pessoa) => (prisma.pessoa.create({ data: pessoa }).catch(error => console.log('error:', error))));
}

async function main() {
  // cria uma bodega
  prisma.bodega.create({
    data: {
      nome: 'Bodega do Alpha',
      descricao: 'Melhor bodega do mundo',
      cnpj: '14.549.348/0001-47',
      imagem: 'logo-bodega.jpg'
    }
  })
    .then(cadastrarCategoriasProdutos)
    .then(cadastrarPessoas)
    .then(() => {
      prisma.usuario.create({
        data: {
          email: 'email@dominio.com',
          senha: '202cb962ac59075b964b07152d234b70', // 123
          idBodega: 1,
          idPessoa: 1
        }
      }).catch(error => console.log('error:', error))
    })
    .then(cadastrarProdutos)
    .then(() => {
      pessoasList.forEach(async (element, index: number) => {
        if (index > 0) {
          prisma.clienteBodega.create({ data: { idBodega: 1, idCliente: 1, } }).catch(error => console.log('error:', error))
        }
      })
    })
    .then(() => {
      prisma.lote.create({
        data: {
          quantidadeInicial: 10,
          quantidadeAtual: 9,
          validade: '2023-05-24T18:25:43.511Z',
          compradoEm: '2023-04-08T18:25:43.511Z',
          custo: 10.00,
          precoVenda: 15.00,
          precoVendaPromocao: 0.00,
          emPromocao: false,
          idCriador: 1,
          idProduto: 1
        }
      }).catch(error => console.log('error:', error))
    })
    .then(() => {
      prisma.lote.create({
        data: {
          quantidadeInicial: 15,
          quantidadeAtual: 9,
          validade: '2023-08-24T18:25:43.511Z',
          compradoEm: '2023-05-08T18:25:43.511Z',
          custo: 15.00,
          precoVenda: 8.00,
          precoVendaPromocao: 0.00,
          emPromocao: false,
          idCriador: 1,
          idProduto: 2
        }
      }).catch(error => console.log('error:', error))
    })
    .then(() => {
      prisma.lote.create({
        data: {
          quantidadeInicial: 15,
          quantidadeAtual: 9,
          validade: '2023-06-24T18:25:43.511Z',
          compradoEm: '2023-05-08T18:25:43.511Z',
          custo: 11.00,
          precoVenda: 8.00,
          precoVendaPromocao: 0.00,
          emPromocao: false,
          idCriador: 1,
          idProduto: 3
        }
      }).catch(error => console.log('error:', error))
    })
    .then(() => {
      prisma.venda.create({ data: { vendidoEm: '2023-04-09T18:25:43.511Z' } }).catch(error => console.log('error:', error))
    })
    .then(() => {
      prisma.vendaLote.create({
        data: {
          quantidade: 1,
          idLote: 1,
          idVenda: 1
        }
      }).catch(error => console.log('error:', error))
    })
      .catch(error => console.log('error', error));
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect()
  })
