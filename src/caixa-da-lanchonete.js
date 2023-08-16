
class CaixaDaLanchonete {
  // Criar o método calcularValorDaCompra
  calcularValorDaCompra(formaDePagamento, itens) {
    // Validar os parâmetros
    const validacao = this.validarParametros(formaDePagamento, itens);
    // Se houver algum erro na validação, retornar a mensagem de erro
    if (validacao.erro) {
      return validacao.mensagem;
    }

    // Criar o objeto do cardápio
    const cardapio = this.criarCardapio();

    // Criar a variável do valor total da compra
    let valorTotal = 0;

    // Verificar se a array de itens está vazia
    if (itens.length === 0) {
      return "Não há itens no carrinho de compra!";
    }

    // Criar um objeto que armazena as quantidades dos itens principais
    const principais = {
      cafe: 0,
      sanduiche: 0,
    };

    // Percorrer a array de itens
    for (let item of itens) {
      // Separar o código e a quantidade do item
      let [codigo, quantidade] = item.split(",");
      // Verificar se a string do item tem uma vírgula
      if (!quantidade) {
        return "Item inválido!";
      }
      // Converter a quantidade para número
      quantidade = Number(quantidade);
      // Validar a quantidade
      if (!quantidade || quantidade <= 0) {
        return "Quantidade inválida!";
      }
      // Verificar se o item existe no cardápio
      if (!cardapio[codigo]) {
        return "Item inválido!";
      }
      // Atualizar as quantidades dos itens principais
      if (codigo === "cafe" || codigo === "sanduiche") {
        principais[codigo] += quantidade;
      }
      // Adicionar o valor do item ao valor total da compra
      valorTotal += cardapio[codigo].valor * quantidade;
    }

    // Percorrer a array de itens novamente
    for (let item of itens) {
      // Separar o código e a quantidade do item
      let [codigo, quantidade] = item.split(",");
      // Converter a quantidade para número
      quantidade = Number(quantidade);
      // Verificar se o item é extra e se há o principal correspondente em quantidade suficiente
      if (
        (codigo === "chantily" && quantidade > principais.cafe) ||
        (codigo === "queijo" && quantidade > principais.sanduiche)
      ) {
        return "Item extra não pode ser pedido sem o principal";
      }
    }

    // Verificar se a forma de pagamento é dinheiro e aplicar o desconto de 5%
    if (formaDePagamento === "dinheiro") {
      valorTotal *= 0.95;
    }

    // Verificar se a forma de pagamento é crédito e aplicar o acréscimo de 3%
    if (formaDePagamento === "credito") {
      valorTotal *= 1.03;
    }

    // Retornar o valor total da compra formatado com vírgula como separador decimal
    return this.formatarResultado(valorTotal);
  }

  // Criar o método validarParametros que recebe a forma de pagamento e os itens como parâmetros e retorna um objeto com um booleano indicando se houve erro e uma mensagem de erro caso haja
  validarParametros(formaDePagamento, itens) {
    // Inicializar o objeto de retorno com erro falso e mensagem vazia
    const retorno = { erro: false, mensagem: "" };
    // Validar os parâmetros
    if (!formaDePagamento || !itens) {
      retorno.erro = true;
      retorno.mensagem = "Não há itens no carrinho de compra!";
    } else if (typeof formaDePagamento !== "string" || !Array.isArray(itens)) {
      retorno.erro = true;
      retorno.mensagem = "Parâmetros inválidos!";
    } else if (!["dinheiro", "debito", "credito"].includes(formaDePagamento)) {
      retorno.erro = true;
      retorno.mensagem = "Forma de pagamento inválida!";
    }
    // Retornar o objeto de retorno
    return retorno;
  }

  // Criar o método criarCardapio que retorna um objeto com o cardápio da lanchonete
  criarCardapio() {
    return {
      cafe: { descricao: "Café", valor: 3 },
      chantily: { descricao: "Chantily (extra do Café)", valor: 1.5 },
      suco: { descricao: "Suco Natural", valor: 6.2 },
      sanduiche: { descricao: "Sanduíche", valor: 6.5 },
      queijo: { descricao: "Queijo (extra do Sanduíche)", valor: 2 },
      salgado: { descricao: "Salgado", valor: 7.25 },
      combo1: { descricao: "1 Suco e 1 Sanduíche", valor: 9.5 },
      combo2: { descricao: "1 Café e 1 Sanduíche", valor: 7.5 },
    };
  }

  // Criar o método formatarResultado que recebe o valor total da compra como parâmetro e retorna uma string formatada com R$ e vírgula como separador decimal
  formatarResultado(valorTotal) {
    return `R$ ${valorTotal.toFixed(2).replace(".", ",")}`;
  }
};

export { CaixaDaLanchonete };