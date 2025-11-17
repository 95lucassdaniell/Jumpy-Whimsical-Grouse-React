# 📋 Sistema de Captação e Recuperação de Leads - Minha T-Shirt

## 🎯 O que foi implementado

Um sistema completo de captação, gerenciamento e **recuperação de leads abandonados** com:

### ✅ Formulário de Contato
- Campos: Nome, Email e Telefone/WhatsApp
- Validação em tempo real
- Botão do WhatsApp liberado somente após preenchimento
- Integração com Google Tag Manager para tracking

### ✅ Banco de Dados
- PostgreSQL com Prisma ORM
- Armazena todos os leads automaticamente
- Rastreia UTM parameters (para saber de onde vieram os visitantes)
- Registra quando o lead clicou no WhatsApp

### ✅ Painel Administrativo (`/admin`)
- Dashboard com métricas em tempo real:
  - Total de visitas
  - Visitantes únicos
  - Leads cadastrados
  - Cliques no WhatsApp
  - Taxa de conversão
- Tabela completa de todos os leads
- Exportação para CSV (Excel)
- Sistema de login seguro

### ✅ Analytics Integrado
- Tracking automático de visitas
- Integração com Google Tag Manager (GTM-P3RGJRKK)
- Métricas de conversão

---

## 🚀 Como usar

### 1. Site Principal (Landing Page)
**URL**: `https://seu-replit.repl.co/`

Os visitantes:
1. Navegam pelo site
2. Clicam em qualquer botão rosa (todos levam para #contato)
3. Preenchem o formulário com nome, email e telefone
4. Após enviar, o botão do WhatsApp é liberado
5. Clicam para falar com a consultora via WhatsApp

### 2. Painel Administrativo
**URL**: `https://seu-replit.repl.co/admin`

**Suas Credenciais**:
- Usuário: `admin`
- Senha: `lucaslol321`

**Aba "📝 Leads Completos"**:
- Ver métricas em tempo real
- Consultar todos os leads que completaram o cadastro
- Exportar leads completos para CSV
- Ver quais leads clicaram no WhatsApp

**Aba "⚠️ Cadastros Abandonados" (NOVO!)**:
- Ver pessoas que começaram a preencher mas não completaram
- Métricas de abandono (total, últimas 24h, com email, com telefone)
- Taxa de recuperação
- Exportar cadastros abandonados para CSV
- **Perfeito para remarketing e recuperação de leads!**

---

## 💡 Sistema de Recuperação de Cadastros Abandonados

### O que é?
O sistema captura automaticamente dados de pessoas que começam a preencher o formulário mas não completam. Isso é MUITO valioso porque você pode:

1. **Recuperar leads perdidos** - Entre em contato com quem quase completou
2. **Entender o problema** - Por que as pessoas abandonam?
3. **Remarketing** - Criar campanhas direcionadas para quem abandonou

### Como funciona?

1. **Visitante começa a preencher** o formulário (digita nome, email ou telefone)
2. **Sistema salva automaticamente** os dados parciais em tempo real (após 1,5 segundos de pausa)
3. **Se o visitante sair** sem completar → dados ficam salvos como "Abandonado"
4. **No painel admin** → Você vê todos os cadastros não concluídos na aba "⚠️ Cadastros Abandonados"

### Exemplo prático:

```
Maria acessa seu site → Começa a digitar:
- Nome: "Maria Silva"  
- Email: "maria@email.com"
- Telefone: "" (ainda não preencheu)

→ Maria fecha a aba antes de clicar em "Continuar"

Você vê no admin:
Nome: Maria Silva
Email: maria@email.com  
Telefone: -
Última atualização: Hoje às 14:32
```

Agora você pode enviar um email para maria@email.com oferecendo ajuda!

---

## 📊 Exportar Leads para Excel

1. Acesse `/admin`
2. Faça login
3. Clique no botão **"📥 Exportar CSV"**
4. O arquivo será baixado automaticamente
5. Abra no Excel, Google Sheets ou qualquer planilha

O arquivo CSV contém:
- Nome
- Email
- Telefone
- Data de cadastro
- UTM Source/Medium/Campaign
- Se clicou no WhatsApp

---

## 🔧 Configurações Importantes

### Alterar Número do WhatsApp

Edite o arquivo: `src/components/contact-form.js`

Procure pela linha:
```javascript
const whatsappNumber = '5511999999999';
```

Substitua pelo seu número (com código do país e DDD):
```javascript
const whatsappNumber = '5511987654321'; // Seu número aqui
```

### Alterar Mensagem do WhatsApp

Na mesma linha abaixo, altere:
```javascript
const message = encodeURIComponent('Olá! Gostaria de saber mais sobre revender t-shirts no atacado.');
```

### Criar Novo Usuário Admin

Execute no terminal:
```bash
cd server && node src/utils/createAdmin.js
```

Ou edite diretamente o arquivo `server/src/utils/createAdmin.js` para criar com dados personalizados.

---

## 📈 Como Funciona o Tracking

### UTM Parameters
Quando alguém acessa seu site através de:
```
https://seu-site.com/?utm_source=instagram&utm_medium=story&utm_campaign=lancamento
```

O sistema automaticamente salva essas informações junto com o lead, permitindo que você saiba exatamente de onde vieram seus melhores clientes!

### Google Tag Manager
Eventos rastreados automaticamente:
- `page_view` - Quando alguém acessa a página
- `form_submit` - Quando o formulário é enviado
- `whatsapp_click` - Quando clicam no botão do WhatsApp

---

## 🗄️ Estrutura do Projeto

```
├── src/                          # Frontend React
│   ├── components/
│   │   ├── contact-form.js       # Formulário de contato
│   │   ├── contact-form.css
│   │   ├── navigation.js
│   │   └── footer.js
│   ├── views/
│   │   ├── home.js               # Página principal
│   │   ├── admin.js              # Painel administrativo
│   │   └── admin.css
│   └── utils/
│       └── analytics.js          # Tracking de visitas
│
├── server/                       # Backend Node.js
│   ├── src/
│   │   ├── controllers/          # Lógica de negócio
│   │   ├── routes/               # Rotas da API
│   │   ├── middleware/           # Autenticação
│   │   └── utils/                # Scripts úteis
│   ├── prisma/
│   │   └── schema.prisma         # Schema do banco
│   └── package.json
│
└── package.json                  # Configuração do projeto
```

---

## 🔒 Segurança

✅ Senhas criptografadas com bcrypt
✅ Sessões seguras com cookies HttpOnly
✅ Validação de dados no cliente e servidor
✅ Proteção de rotas administrativas
✅ IP hash para privacidade nos logs

---

## 🆘 Problemas Comuns

### "Erro ao enviar formulário"
- Verifique se o servidor backend está rodando
- Confirme que o PostgreSQL está conectado

### "Não consigo fazer login no admin"
- Usuário: `admin`
- Senha: `admin123`
- Se esqueceu, recrie com: `cd server && node src/utils/createAdmin.js`

### "Os dados não aparecem no admin"
- Limpe o cache do navegador
- Faça logout e login novamente
- Verifique se há erros no console do navegador (F12)

---

## 📞 Próximos Passos Sugeridos

1. **Alterar senha do admin** para uma senha forte
2. **Configurar número do WhatsApp** com seu número real
3. **Testar o fluxo completo**: cadastro → WhatsApp → verificar no admin
4. **Personalizar mensagem do WhatsApp**
5. **Compartilhar o link** com UTM parameters para tracking

---

## 🎉 Tudo Pronto!

Seu sistema de captação de leads está 100% funcional e pronto para usar!

Todos os dados são salvos automaticamente no banco de dados PostgreSQL e você pode acessá-los a qualquer momento pelo painel administrativo.

**Boa sorte com suas vendas!** 🚀
