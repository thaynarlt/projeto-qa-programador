const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const {
  addCucumberPreprocessorPlugin,
} = require("@badeball/cypress-cucumber-preprocessor");
const {
  createEsbuildPlugin,
} = require("@badeball/cypress-cucumber-preprocessor/esbuild");

module.exports = defineConfig({
  e2e: {
    // Site-alvo: Portal do Governo Brasileiro
    baseUrl: "https://www.gov.br",

    // Onde estao os arquivos .feature (Gherkin)
    specPattern: "cypress/e2e/features/**/*.feature",

    // Arquivo de suporte global (comandos customizados, etc.)
    supportFile: "cypress/support/e2e.js",

    // O Portal gov.br pode demorar a responder: damos um folego maior.
    defaultCommandTimeout: 15000,
    pageLoadTimeout: 60000,
    requestTimeout: 15000,

    // Desabilita a verificacao de seguranca entre dominios (o gov.br
    // redireciona entre subdominios durante a navegacao/busca).
    chromeWebSecurity: false,

    // Resolucao da viewport usada nos testes.
    viewportWidth: 1366,
    viewportHeight: 768,

    // Nao grava video por padrao para deixar a execucao mais leve.
    video: false,

    async setupNodeEvents(on, config) {
      // Habilita o preprocessor do Cucumber (gera relatorios, etc.).
      await addCucumberPreprocessorPlugin(on, config);

      // Usa o esbuild para empacotar os steps escritos em .js.
      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );

      // Retorna a config (pode ter sido alterada pelos plugins acima).
      return config;
    },
  },
});
