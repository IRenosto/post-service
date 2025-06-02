
# Postagem Service

Este serviço é responsável pelo gerenciamento de postagens, incluindo criação, visualização, atualização e exclusão, além de integração com autenticação, autorização e métricas Prometheus.

## 🛠️ Funcionalidades

- ✅ Criação de postagens com upload de imagens.
- ✅ Listagem de postagens visíveis para o público.
- ✅ Listagem administrativa de todas as postagens.
- ✅ Atualização de postagens.
- ✅ Remoção de postagens.
- ✅ Proteção por autenticação JWT e autorização baseada em permissões.
- ✅ Exposição de métricas via Prometheus.

## ⚡ Como rodar o serviço

Este serviço é executado via `docker-compose up`.  
✅ **Requisito:** Antes de rodar, crie uma Docker Network externa chamada:

```bash
docker network create rede-compartilhada
```

Depois disso, basta rodar:

```bash
docker-compose up --build
```

O serviço estará disponível na porta configurada no `docker-compose.yml` (por padrão `5032`).

## 📖 Documentação da API

A API segue o padrão **Swagger** e possui as seguintes rotas principais:

### ✅ Rota de status
- **GET /**  
Retorna mensagem de funcionamento.

### ✅ Métricas
- **GET /metrics**  
Retorna métricas no formato Prometheus.

### ✅ Postagens
- **POST /postagens**  
Cria uma nova postagem.  
🔒 Requer autenticação e permissão `POSTAGEM_ESCRITA`.

- **DELETE /postagens/:id**  
Deleta uma postagem pelo ID.  
🔒 Requer autenticação e permissão `POSTAGEM_DELECAO`.

- **GET /postagens/administrador**  
Retorna todas as postagens.  
🔒 Requer autenticação e permissão `POSTAGEM_ESCRITA`.

- **GET /postagens/:id**  
Retorna detalhes de uma postagem pública.

- **GET /postagens**  
Lista todas as postagens visíveis ao público.

- **PATCH /postagens/:id**  
Atualiza uma postagem existente.  
🔒 Requer autenticação e permissão `POSTAGEM_ESCRITA`.

## ✅ Tecnologias Utilizadas

- **Node.js** + **Express**
- **TypeScript**
- **Multer** (upload de arquivos)
- **Swagger** (documentação)
- **Prometheus** (métricas)
- **Docker** + **Docker Compose**
