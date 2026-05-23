import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import HomePage from "../../pages/home.page";

// ---------------------------------------------------------------------------
// PASSO COMPARTILHADO
// Este "Dado" e usado tanto nesta feature quanto no Contexto da feature de
// busca. Por isso ele e definido apenas uma vez, aqui.
// ---------------------------------------------------------------------------
Given("que eu acesso a pagina inicial do gov.br", () => {
  HomePage.acessar();
});

// ---------------------------------------------------------------------------
// Cenario: Acessar a pagina inicial do Portal gov.br
// ---------------------------------------------------------------------------
Then("eu devo ver o titulo da pagina contendo {string}", (tituloEsperado) => {
  // RESULTADO: o titulo da aba do navegador deve conter o texto esperado.
  cy.title().should("include", tituloEsperado);
});

Then("o campo de busca deve estar visivel", () => {
  // RESULTADO: o campo de busca do portal esta renderizado e visivel.
  HomePage.campoBusca().should("be.visible");
});

// ---------------------------------------------------------------------------
// Cenario: Navegar ate a pagina de Servicos
// ---------------------------------------------------------------------------
When("eu navego ate a secao de Servicos", () => {
  // ACAO: clicar no link de "Servicos" no cabecalho do portal.
  HomePage.irParaServicos();
});

Then("a URL deve conter {string}", (trecho) => {
  // RESULTADO: a navegacao levou para a pagina cuja URL contem o trecho.
  cy.url().should("include", trecho);
});

Then("eu devo ver o conteudo da pagina de Servicos", () => {
  // RESULTADO: a pagina de Servicos carregou e possui conteudo visivel.
  cy.get("body").should("be.visible").and("not.be.empty");
});
