# language: pt
Funcionalidade: Busca de servicos no Portal gov.br
  Como um cidadao brasileiro
  Quero buscar servicos publicos pelo campo de busca
  Para localizar rapidamente o que preciso

  Contexto:
    Dado que eu acesso a pagina inicial do gov.br

  Cenario: Buscar um servico publico existente
    Quando eu busco pelo servico informado na fixture
    Entao eu devo ser direcionado para a pagina de resultados
    E os resultados devem mencionar o termo pesquisado

  Esquema do Cenario: Buscar diferentes servicos publicos
    Quando eu digito o termo "<termo>" no campo de busca
    E confirmo a pesquisa
    Entao eu devo ser direcionado para a pagina de resultados
    E os resultados devem mencionar o termo "<termo>"

    Exemplos:
      | termo       |
      | CPF         |
      | Passaporte  |
      | CNH         |
