import { When, Then } from "@badeball/cypress-cucumber-preprocessor";
import BuscaPage from "../../pages/busca.page";

// Variavel de modulo usada para guardar o termo lido da fixture, de modo
// que o passo "Entao" possa valida-lo logo apos o passo "Quando".
let termoBuscado;

// ---------------------------------------------------------------------------
// Cenario: Buscar um servico publico existente (usa a fixture)
// ---------------------------------------------------------------------------
When("eu busco pelo servico informado na fixture", () => {
  // ACAO: le o termo do arquivo de fixture e realiza a busca.
  cy.fixture("termosBusca").then((dados) => {
    termoBuscado = dados.servicoValido.termo;
    BuscaPage.buscar(termoBuscado);
  });
});

Then("os resultados devem mencionar o termo pesquisado", () => {
  // RESULTADO: a pagina de resultados menciona o termo buscado.
  cy.contains(new RegExp(termoBuscado, "i"), { timeout: 20000 }).should(
    "exist"
  );
});

// ---------------------------------------------------------------------------
// Esquema do Cenario: Buscar diferentes servicos publicos
// ---------------------------------------------------------------------------
When("eu digito o termo {string} no campo de busca", (termo) => {
  // ACAO: digita o termo recebido do "Exemplos" no campo de busca.
  termoBuscado = termo;
  BuscaPage.digitarTermo(termo);
});

When("confirmo a pesquisa", () => {
  // ACAO: confirma a pesquisa (Enter).
  BuscaPage.confirmarPesquisa();
});

Then("os resultados devem mencionar o termo {string}", (termo) => {
  // RESULTADO: a pagina de resultados menciona o termo pesquisado.
  cy.contains(new RegExp(termo, "i"), { timeout: 20000 }).should("exist");
});

// ---------------------------------------------------------------------------
// Passo de RESULTADO compartilhado pelos dois cenarios de busca
// ---------------------------------------------------------------------------
Then("eu devo ser direcionado para a pagina de resultados", () => {
  // RESULTADO: saimos da home (a URL nao e mais apenas /pt-br) e a pagina
  // de resultados foi renderizada.
  cy.url().should("not.match", /\/pt-br\/?$/);
  cy.get("body").should("be.visible").and("not.be.empty");
});
