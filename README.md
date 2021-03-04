<h1 align="center">
    <img alt="Proffy" src=".github/logo.svg" height="100px" />
    <br>Next Level Week #2<br/>
    Node.js | ReactJS | React Native
</h1>

<p align="center">
    <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/DanielAraldi/Proffy-NLW?style=flat-square">
    <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/DanielAraldi/Proffy-NLW?style=flat-square">
    <img alt="GitHub" src="https://img.shields.io/github/license/DanielAraldi/Proffy-NLW?style=flat-square">
    <img alt="Made by Rocketseat" src="https://img.shields.io/badge/made%20by-Rocketseat-%237519C1?style=flat-square"><br/>
</p>

<p align="center">
    <a href="#bookmark-sobre-o-projeto">Sobre</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
    <a href="#rocket-tecnologias-utilizadas">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
    <a href="#boom-como-executar">Como Executar</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
    <a href="#memo-licença">Licença</a>
</p>

<p align="center">
    <img alt="Design do Projeto" width="650px" src="./.github/design.png" />
<p>

## :bookmark: Sobre o Projeto

O **Proffy** é uma aplicação Web e Mobile feita para ajudar na conexão entre os alunos e os professores. Assim, esta aplicação oferece aos professores a possibilidade de criar e regular aulas, podendo colocar informações sobre as aulas, o custo e horário das aulas. Quanto aos alunos, possuem a possibilidade de buscar as aulas cadastradas.

Este projeto foi idealizado pensando no dia **6 de agosto**, onde se comemora o **Dia Nacional dos Profissionais da Educação**, criado como forma de homenagear os professores.

Essa aplicação foi realizada durante a **Next Level Week #2**, projeto da [Rocketseat](https://rocketseat.com.br/).

## :rocket: Tecnologias Utilizadas

-  [Axios](https://github.com/axios/axios)
-  [Express](https://expressjs.com/)
-  [Expo](https://expo.io/)
-  [Knex](http://knexjs.org/)
-  [Node.js](https://nodejs.org/en/)
-  [ReactJS](https://reactjs.org/)
-  [React Native](http://facebook.github.io/react-native/)
-  [Typescript](https://www.typescriptlang.org/)
-  [SQLite](https://www.sqlite.org/)

## :boom: Como Executar

- ### **Pré-requisitos**

  - É **necessário** possuir o **[Node.js](https://nodejs.org/en/)** instalado no computador
  - É **necessário** possuir o **[Git](https://git-scm.com/)** instalado e configurado no computador
  - Também, é **preciso** ter um gerenciador de pacotes seja o **[Yarn](https://yarnpkg.com/)** ou **[NPM](https://www.npmjs.com/)**.
  - Por fim, é **essencial** ter o **[Expo](https://expo.io/)** instalado de forma global na máquina

1. Faça um clone do repositório:

```sh
  $ git clone https://github.com/DanielAraldi/Proffy-NLW.git
```

2. Executando a Aplicação:

```sh
  # API
  $ cd server
  # Instalando as dependências do projeto.
  $ yarn install # ou npm install

  # CONFIGURANDO O BANCO DE DADOS E A CRIAÇÃO DE TABELAS.
  $ yarn knex:migrate # ou npm run knex:migrate
  # Inicie a API
  $ yarn start # ou npm start

  # APLICAÇÃO WEB
  $ cd web
  # Instalando as dependências do projeto.
  $ npm install # ou yarn install
  # Inicie a aplicação web
  $ npm start # ou yarn start

  # APLICAÇÃO MOBILE
  $ cd mobile
  # Instalando as dependências do projeto.
  $ yarn install # ou npm install
  # Inicie a aplicação mobile
  $ yarn start # ou npm start
```

## :memo: Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---
<sup>Projeto desenvolvido com a tutoria de [Diego Fernandes](https://github.com/diego3g), da [Rocketseat](https://rocketseat.com.br/).</sup>
