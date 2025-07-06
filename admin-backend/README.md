# Admin Backend

Este backend em Node.js fornece funcionalidades administrativas para o app de Recreação Kids Hotel.

## Funcionalidades
- Autenticação JWT para administradores (`/auth/login`)
- CRUD de programações (`/programs`)
- Cadastro de crianças (`/children`)
- Exportação de cadastros para Excel (`/export`)
- Galeria de fotos com upload e remoção (`/gallery`)
- Chat em tempo real via Socket.io

## Como executar
```bash
npm install
node server.js
```
O servidor rodará na porta 3001.

Para verificar a instalação, execute `npm test` que apenas imprime uma
mensagem informativa.
