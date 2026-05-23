// Page Object da pagina inicial do Portal gov.br.
// Concentra os seletores e as acoes da home, mantendo os steps limpos.

class HomePage {
  // ----- ELEMENTOS (Capturar elemento) -----
  seletores = {
    // #govbr-busca-input e um wrapper <div>; o <input> real fica dentro dele.
    campoBusca: "#govbr-busca-input input",
    // O link de "Servicos" no cabecalho aponta para /pt-br/servicos.
    linkServicos: 'a[href$="/pt-br/servicos"]',
  };

  // ----- ACOES (Inserir uma acao) -----

  /**
   * Acessa a pagina inicial do gov.br e fecha eventual aviso de cookies.
   */
  acessar() {
    cy.visit("/pt-br");
    cy.fecharAvisoCookies();
    return this;
  }

  /**
   * Retorna o campo de busca para asseroes nos steps.
   */
  campoBusca() {
    return cy.get(this.seletores.campoBusca);
  }

  /**
   * Navega ate a secao de Servicos clicando no link do cabecalho.
   * Usamos { force: true } porque o link pode estar dentro de um menu
   * recolhido dependendo da largura da viewport.
   */
  irParaServicos() {
    cy.get(this.seletores.linkServicos).first().click({ force: true });
    return this;
  }
}

export default new HomePage();
