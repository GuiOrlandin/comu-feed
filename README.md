### RFs (Requisitos funcionais)

- [x] Deve ser possível se cadastrar/logar.
- [x] Deve ser possível criar um post se estiver logado
- [x] Deve ser possível visualizar comunidades somente se ela for publica ou tiver acesso a elas.
- [x] Deve ser possível se cadastrar/entrar uma comunidade se estiver logado.

### RNs (Regras de negócio)

- [x] Para criar um posto, obrigatoriamente precisamos informar o titulo e se é um text ou um arquivo de video.
- [x] A comunidade precisa ter estar publica ou privada.
- [x] A comunidade deve estar ligado a um usuário.
- [x] Para um usuário dar "amor" nos posts ele deve estar logado.

### RNFs (Requisitos não funcionais)

- [x] A senha do usuário precisa estar criptografada;
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgresSQL;
- [x] O usuário deve ser identificado por um JWT (JSON web Token);
