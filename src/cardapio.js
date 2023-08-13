export class Cardapio {
  #cardapio = [
    { codigo: "cafe", descricao: "Café", valor: 300 },
    { codigo: "chantily", descricao: "Chantily (extra do Café)", valor: 150 },
    { codigo: "suco", descricao: "Suco Natural", valor: 620 },
    { codigo: "sanduiche", descricao: "Sanduíche", valor: 650 },
    { codigo: "queijo", descricao: "Queijo (extra do Sanduíche)", valor: 200 },
    { codigo: "salgado", descricao: "Salgado", valor: 725 },
    { codigo: "combo1", descricao: "1 Suco e 1 Sanduíche", valor: 950 },
    { codigo: "combo2", descricao: "1 Café e 1 Sanduíche", valor: 750 },
  ];

  get() {
    return this.#cardapio;
  }
}
