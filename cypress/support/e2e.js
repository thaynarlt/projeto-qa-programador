// ***********************************************************
// Este arquivo e carregado automaticamente pelo Cypress antes
// de cada arquivo de teste. E o lugar ideal para importar
// comandos customizados e configuracoes globais.
// ***********************************************************

import "./commands";

// O Portal gov.br as vezes lanca erros de JavaScript de terceiros
// (scripts de analytics, etc.) que nao tem relacao com o nosso teste.
// Ignoramos essas excecoes para que elas nao derrubem os cenarios.
Cypress.on("uncaught:exception", () => {
  return false;
});
