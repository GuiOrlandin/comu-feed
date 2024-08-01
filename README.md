# APP

Desenvolvi este projeto com o objetivo de criar uma plataforma de comunidades semelhante ao Reddit, Inc., no entanto com uma interface diferente, onde os usuários podem criar e participar de comunidades, algumas com acesso restrito por senha. Para essas comunidades, apenas os membros autorizados conseguem visualizar os posts. Ademais, os usuários podem curtir os posts, comentar e editar o seu perfil, desde que estejam logados.

O frontend foi construído utilizando Next.js, React Query e TypeScript. O backend foi desenvolvido com Node.js e Typescript, utilizando o framework Nest.js para a construção das APIs. O banco de dados PostgreSQL foi configurado em um contêiner Docker. O gerenciamento do banco de dados foi realizado pelo Prisma.

### Clonando o repositório

```sh
gh repo clone GuiOrlandin/comu-feed
```

### Navegue até os diretórios do projeto

```sh
cd api
```

```sh
cd web
```

## Back-end (API)

## Informações do Back-end 

### RFs (Requisitos funcionais)

- [X] Deve ser possível se cadastrar/logar.
- [X] Deve ser possível criar um post se estiver logado
- [X] Deve ser possível visualizar comunidades somente se ela for publica ou tiver acesso a elas.
- [X] Deve ser possível se cadastrar/entrar uma comunidade se estiver logado.

### RNs (Regras de negócio)

- [X] Para criar um posto, obrigatoriamente precisamos informar o titulo e se é um text ou um arquivo de video.
- [X] A comunidade precisa estar publica ou privada.
- [X] A comunidade deve estar ligado a um usuário.
- [X] Para um usuário dar "amor" nos posts ele deve estar logado.

### RNFs (Requisitos não funcionais)

- [X] A senha do usuário precisa estar criptografada;
- [X] Os dados da aplicação precisam estar persistidos em um banco PostgresSQL;
- [X] O usuário deve ser identificado por um JWT (JSON web Token);

### Instale as dependências

```sh
npm i
```

### Execute o docker compose

```sh
docker compose up
```

### Execute o docker e rode as migrations

```sh
docker start
```

```sh
npx prisma migrate dev

```

### Inicie a aplicação no back-end

```sh
npm run start:dev
```

### Rode os testes do back-end

```sh
npm run test
```

## Front-end (WEB)

### Instale as dependências

```sh
npm i
```

### Inicie a aplicação no front-end

```sh
npm run dev
```

## Demo

Video em que mostro todas as funcionalidades do projeto: https://www.linkedin.com/posts/guilherme-orlandin-580299142_nextjs-nodejs-typescript-activity-7224759395979563009-FfFF?utm_source=share&utm_medium=member_desktop
