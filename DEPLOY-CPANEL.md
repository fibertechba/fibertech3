# Publicar no cPanel / HostGator (hospedagem compartilhada)

O site é gerado como HTML estático pré-renderizado — cada página vira um
`index.html` próprio, então funciona em qualquer Apache, sem Node.js no servidor.

## 1. Gerar os arquivos

```bash
npm install
SITE_URL="https://www.seudominio.com.br" npm run build:static
```

O resultado fica em **`dist-static/`**:

```
dist-static/
├── index.html                  <- página inicial (gerada automaticamente)
├── planos/index.html
├── servicos/index.html
├── cobertura/index.html
├── contato/index.html
├── ... (uma pasta por página)
├── assets/                     <- JS, CSS, imagens
├── sitemap.xml
├── robots.txt
└── .htaccess                   <- rotas, HTTPS, cache e compressão
```

## 2. Enviar para o servidor

1. Compacte o **conteúdo** de `dist-static/` em um `.zip`
   (os arquivos na raiz do zip, não a pasta `dist-static` em si).
2. No cPanel abra **Gerenciador de Arquivos → `public_html`**.
3. Envie o `.zip` e clique em **Extrair**.
4. Ative "Mostrar arquivos ocultos" (Configurações) e confirme que o
   **`.htaccess`** foi extraído junto.

Se o site for para um subdomínio ou addon domain, use a pasta correspondente
(ex.: `public_html/subdominio/`) e ajuste `RewriteBase /` no `.htaccess`
para `RewriteBase /subdominio/`.

## 3. Conferir

- `https://seudominio.com.br/` → página inicial
- `https://seudominio.com.br/planos` → abre e também funciona ao dar **F5**
- Certificado SSL: cPanel → **SSL/TLS Status** → AutoSSL

## Observações

- Não use "Setup Node.js App" — não é necessário.
- O `sitemap.xml` é gerado com a URL passada em `SITE_URL`. Sem essa variável
  ele usa `https://www.seudominio.com.br` como exemplo.
- Formulários de contato são estáticos: para envio de e-mail, aponte para um
  serviço externo (Formspree, etc.) ou um `.php` próprio no cPanel.
- A cada alteração no código, rode `npm run build:static` novamente e reenvie
  o conteúdo de `dist-static/`.
