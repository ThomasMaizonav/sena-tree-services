# Sena Tree Services - Website

Website institucional da Sena Tree Services, construído com Next.js e Tailwind CSS.

## Stack
- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- Vercel Analytics

## Requisitos
- Node.js 20+
- npm 10+ (ou compatível)

## Rodando localmente
```bash
npm install
npm run dev
```

Abra `http://localhost:3000`.

## Build de produção
```bash
npm run build
npm run start
```

## Estrutura principal
- `app/page.tsx`: monta a home com todas as seções.
- `components/`: seções da página (`hero`, `about`, `services`, `project-gallery`, `why-choose-us`, `contact`, `footer` etc.).
- `public/images/`: imagens usadas no site.
- `app/layout.tsx`: metadata global, favicon e configuração base.
- `app/globals.css`: estilos globais e utilitários.

## Edição rápida (conteúdo)
- Favicon: `app/layout.tsx` e arquivo em `public/`.
- Links de redes sociais: `components/footer.tsx`.
- Imagem da seção "Why Choose Us": `components/why-choose-us.tsx`.
- Carrossel de imagens: `components/project-gallery.tsx` e arquivos em `public/images/gallery/`.
- Textos das seções: arquivos dentro de `components/`.

## Deploy
O projeto está preparado para deploy na Vercel.

Se precisar publicar nova versão:
```bash
vercel --prod --yes
```

## Observações
- O projeto foi simplificado para remover resíduos desnecessários de geração automática.
- Mantenha imagens otimizadas (JPG/PNG/WebP) para melhor performance.
