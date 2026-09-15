# Controle de Ponto/Escala — Frontend

Interface web para o sistema de controle de ponto e escala com fluxo de aprovação, desenvolvida em React + TypeScript.

> Backend deste projeto: [controle-ponto](https://github.com/Felipebuzo/controle-ponto)

## Sobre o projeto

Consome a API REST do backend para permitir que funcionários registrem ponto e solicitem ajustes, e que gestores aprovem ou rejeitem essas solicitações — tudo através de uma interface autenticada por token JWT.

## Funcionalidades

- Login com autenticação via JWT (token persistido no `localStorage`)
- Área do funcionário: bater ponto, consultar histórico, solicitar ajuste de ponto
- Área do gestor: listar solicitações pendentes, aprovar ou rejeitar
- Navegação entre telas via React Router, com estado de autenticação compartilhado via Context API

## Tecnologias

- React
- TypeScript
- Vite
- React Router DOM
- Axios

## Arquitetura

- `pages` — telas da aplicação (Login, BaterPonto, Historico, SolicitarAjuste, GestorPendentes, Layout)
- `contexts` — `AuthContext`, gerenciando o usuário logado e as ações de login/logout
- `services` — cliente HTTP (Axios) configurado com interceptor que anexa o token JWT automaticamente em cada requisição
- `types` — interfaces TypeScript espelhando os modelos de dados do backend

## Como rodar o projeto

### Pré-requisitos
- Node.js
- O [backend](https://github.com/Felipebuzo/controle-ponto) rodando em `http://localhost:8080`

### Passos

1. Clone o repositório
2. Instale as dependências:

npm install

3. Rode o servidor de desenvolvimento:

npm run dev

4. Acesse `http://localhost:5173`

## Autor

Felipe Buzo — [GitHub](https://github.com/Felipebuzo)