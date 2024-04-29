### RFs (Requisitos funcionais)

- [] Deve ser possível se cadastrar/logar.
- [] Deve ser possível criar um post se estiver logado
- [] Deve ser possível visualizar comunidades somente se ela for publica ou tiver acesso a elas.
- [] Deve ser possível se cadastrar/entrar uma comunidade se estiver logado.

### RNs (Regras de negócio)

- [] Para criar um posto, obrigatoriamente precisamos informar o titulo e se é um text ou um arquivo de video.
- [] A comunidade precisa ter estar publica ou privada.
- [] A comunidade deve estar ligado a um usuário.
- [] Para um usuário dar "amor" nos posts ele deve estar logado.

### RNFs (Requisitos não funcionais)

- [] A senha do usuário precisa estar criptografada;
- [] Os dados da aplicação precisam estar persistidos em um banco PostgresSQL;
- [] O usuário deve ser identificado por um JWT (JSON web Token);
