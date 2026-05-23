// ***********************************************
// Comandos customizados do Cypress.
// Documentacao: https://on.cypress.io/custom-commands
// ***********************************************

/**
 * Fecha o aviso de cookies / privacidade do Portal gov.br, caso ele
 * apareca. O comando e tolerante: se o banner nao existir, ele
 * simplesmente segue em frente sem falhar o teste.
 */
Cypress.Commands.add("fecharAvisoCookies", () => {
  cy.get("body").then(($body) => {
    const possiveisBotoes = [
      'button:contains("Aceitar")',
      'button:contains("aceito")',
      'button:contains("Concordar")',
      "#accept-cookies",
      ".cookies-eprivacy button",
    ];

    possiveisBotoes.forEach((seletor) => {
      if ($body.find(seletor).length > 0) {
        cy.get(seletor).first().click({ force: true });
      }
    });
  });
});
