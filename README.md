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
