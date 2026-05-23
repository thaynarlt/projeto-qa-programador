// Page Object da busca do Portal gov.br.
// Encapsula a digitacao no campo de busca e a confirmacao da pesquisa.

class BuscaPage {
  // ----- ELEMENTOS (Capturar elemento) -----
  seletores = {
    // #govbr-busca-input e um wrapper <div>; o <input> real fica dentro dele.
    campoBusca: "#govbr-busca-input input",
  };

  // ----- ACOES (Inserir uma acao) -----

  /**
   * Digita um termo no campo de busca (sem confirmar ainda).
   * Usamos { force: true } porque o componente de busca do gov.br (Algolia
   * Autocomplete) abre um overlay que pode cobrir o input entre buscas.
   */
  digitarTermo(termo) {
    cy.get(this.seletores.campoBusca)
      .should("exist")
      .clear({ force: true })
      .type(termo, { force: true });
    return this;
  }

  /**
   * Confirma a pesquisa pressionando Enter no campo de busca.
   */
  confirmarPesquisa() {
    cy.get(this.seletores.campoBusca).type("{enter}", { force: true });
    return this;
  }

  /**
   * Atalho: digita o termo e ja confirma a pesquisa.
   */
  buscar(termo) {
    this.digitarTermo(termo).confirmarPesquisa();
    return this;
  }
}

export default new BuscaPage();
