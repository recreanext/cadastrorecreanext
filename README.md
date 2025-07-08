# Cadastro Recrea Next

Aplicativo simples para cadastro de crianças em atividades infantis de hotéis.
Agora é possível cadastrar mais de uma criança por responsável.
Utilize o botão "Adicionar criança" para incluir quantas fichas forem necessárias.

## Desenvolvimento

Instale as dependências e rode o servidor de desenvolvimento:

```bash
npm install
npm run dev
```

Acesse `http://localhost:3000` no navegador.

### Painel Admin

Defina a senha no arquivo `.env.local` usando a variável `ADMIN_PASS`.
Acesse `/admin/login` e faça login para editar a programação e baixar os cadastros em Excel.

### Testes

Execute `npm test` para rodar o script de testes (placeholder).
