# language: pt
Funcionalidade: Acesso ao Portal gov.br
  Como um cidadao brasileiro
  Quero acessar o Portal gov.br
  Para encontrar servicos e informacoes do Governo Federal

  Cenario: Acessar a pagina inicial do Portal gov.br
    Dado que eu acesso a pagina inicial do gov.br
    Entao eu devo ver o titulo da pagina contendo "GOV.BR"
    E o campo de busca deve estar visivel

  Cenario: Navegar ate a pagina de Servicos
    Dado que eu acesso a pagina inicial do gov.br
    Quando eu navego ate a secao de Servicos
    Entao a URL deve conter "/servicos"
    E eu devo ver o conteudo da pagina de Servicos
