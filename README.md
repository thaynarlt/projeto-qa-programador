# Projeto VA02 de QA – P5 | BDD: Cypress + Cucumber + Gherkin

Automação de testes de UI no **Portal do Governo Brasileiro (gov.br)** usando
**Behavior-Driven Development (BDD)** com **Cypress 13+**, **Cucumber** e
**Gherkin** (palavras reservadas em português).

---

## 1. Sobre o projeto

| Item | Descrição |
|------|-----------|
| **Alvo (app)** | Portal gov.br — https://www.gov.br/pt-br |
| **Contexto testado** | Acesso à página inicial, navegação até a seção de Serviços e busca de serviços públicos |
| **Padrões** | BDD, Gherkin em português, Page Objects e Fixtures |
| **Stack** | Cypress (≥ 13), `@badeball/cypress-cucumber-preprocessor`, esbuild |

A automação segue o ciclo básico de UI **Elemento → Ação → Resultado**:
capturamos um elemento da página, executamos uma ação sobre ele e validamos o
resultado esperado.

---

## 2. Estrutura do projeto

```
projeto-va02-qa/
├─ package.json
├─ cypress.config.js
├─ .cypress-cucumber-preprocessorrc.json
├─ README.md
└─ cypress/
   ├─ e2e/
   │  ├─ features/                # Cenários em Gherkin (.feature)
   │  │  ├─ acessoPortal.feature
   │  │  └─ buscaServicos.feature
   │  └─ steps/                   # Implementação dos passos
   │     ├─ acessoPortalSteps.js
   │     └─ buscaServicosSteps.js
   ├─ pages/                      # Page Objects
   │  ├─ home.page.js
   │  └─ busca.page.js
   ├─ fixtures/                   # Massa de dados
   │  └─ termosBusca.json
   └─ support/
      ├─ commands.js              # Comandos customizados
      └─ e2e.js
```

---

## 3. Pré-requisitos

- [Node.js](https://nodejs.org/) (versão LTS recomendada) e npm instalados.

---

## 4. Instalação

Dentro da pasta do projeto:

```bash
# 1) Instala as dependências já declaradas no package.json
npm install
```

> Se for montar do zero, os comandos seriam:
> ```bash
> npm init -y
> npm install cypress -D
> npm install -D @badeball/cypress-cucumber-preprocessor @bahmutov/cypress-esbuild-preprocessor esbuild
> ```

---

## 5. Como executar os testes

**Modo interativo (abre a interface do Cypress):**

```bash
npx cypress open
```

Em seguida escolha **E2E Testing**, selecione um navegador e clique em um dos
arquivos `.feature` para rodar.

**Modo headless (linha de comando):**

```bash
npx cypress run
```

Ou pelos atalhos do `package.json`: `npm run cy:open` e `npm run cy:run`.

---

## 6. Planejamento dos testes (Elemento → Ação → Resultado)

| # | Cenário | Elemento (capturar) | Ação | Resultado esperado |
|---|---------|---------------------|------|--------------------|
| 1 | Acessar a página inicial | Página inicial / campo de busca | Visitar `gov.br/pt-br` | Título contém "GOV.BR" e o campo de busca está visível |
| 2 | Navegar até Serviços | Link "Serviços" do cabeçalho | Clicar no link | A URL passa a conter `/servicos` e a página carrega |
| 3 | Buscar serviço (via fixture) | Campo de busca `#govbr-busca-input` | Digitar o termo da fixture e pressionar Enter | É direcionado à página de resultados que menciona o termo |
| 4 | Buscar vários serviços (Esquema do Cenário) | Campo de busca `#govbr-busca-input` | Digitar cada termo dos Exemplos e confirmar | Página de resultados exibida mencionando cada termo |

---

## 7. Cenários de teste (escritos em Gherkin)

### Funcionalidade: Acesso ao Portal gov.br

```gherkin
Cenário: Acessar a pagina inicial do Portal gov.br
  Dado que eu acesso a pagina inicial do gov.br
  Então eu devo ver o titulo da pagina contendo "GOV.BR"
  E o campo de busca deve estar visivel

Cenário: Navegar ate a pagina de Servicos
  Dado que eu acesso a pagina inicial do gov.br
  Quando eu navego ate a secao de Servicos
  Então a URL deve conter "/servicos"
  E eu devo ver o conteudo da pagina de Servicos
```

### Funcionalidade: Busca de serviços no Portal gov.br

```gherkin
Cenário: Buscar um servico publico existente
  Dado que eu acesso a pagina inicial do gov.br
  Quando eu busco pelo servico informado na fixture
  Então eu devo ser direcionado para a pagina de resultados
  E os resultados devem mencionar o termo pesquisado

Esquema do Cenário: Buscar diferentes servicos publicos
  Dado que eu acesso a pagina inicial do gov.br
  Quando eu digito o termo "<termo>" no campo de busca
  E confirmo a pesquisa
  Então eu devo ser direcionado para a pagina de resultados
  E os resultados devem mencionar o termo "<termo>"

  Exemplos:
    | termo       |
    | CPF         |
    | Passaporte  |
    | CNH         |
```

**Total: 3 Cenários + 1 Esquema do Cenário (3 linhas de Exemplos)** — atende o
mínimo exigido (3 cenários, 1 esquema com ≥ 2 linhas, 4 "testes").

---

## 8. Observações sobre o site-alvo

O gov.br é um site **público, real e em constante atualização**. Os seletores
e textos usados aqui (ex.: `#govbr-busca-input`, link `/pt-br/servicos`) foram
verificados na estrutura atual do portal. Como em qualquer projeto de QA contra
um ambiente vivo, se o site mudar, basta inspecionar o elemento (F12) e ajustar
o seletor no respectivo **Page Object** (`cypress/pages/`) — a separação em Page
Objects existe justamente para tornar esse ajuste rápido e centralizado.

---

## 9. Roteiro sugerido para o vídeo

1. **Qual é a app?** — Mostrar o alvo: Portal gov.br.
2. **Iremos testar o quê?** — Mostrar os contextos: acesso, navegação e busca.
3. **Cenários?** — Mostrar a lista de cenários (seção 7 deste README).
4. **Casos de teste?**
   - 4.1) **Texto** — mostrar a tabela de planejamento (seção 6).
   - 4.2) **Código** — mostrar os `.feature` e os arquivos `*Steps.js`.
5. **Executar o código!** — Rodar `npx cypress open` e mostrar os testes passando.
