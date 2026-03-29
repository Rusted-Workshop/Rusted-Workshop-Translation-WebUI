# Cloudflare Pages Deployment

This project is configured for automatic deployment to Cloudflare Pages via GitHub Actions.

## Setup GitHub Secrets

Add the following secrets to your GitHub repository settings (`Settings` → `Secrets and variables` → `Actions`):

1. **CLOUDFLARE_API_TOKEN**
   - Create at: https://dash.cloudflare.com/profile/api-tokens
   - Required permissions: `Cloudflare Pages: Edit`

2. **CLOUDFLARE_ACCOUNT_ID**
   - Find at: https://dash.cloudflare.com/
   - Value: `cba081da700634b7b699673952aae247`

3. **NEXT_PUBLIC_API_BASE_URL**
   - Value: `https://rw-translate-api.denox.cc`

## Deployment

- **Automatic**: Every push to `main` branch triggers automatic deployment
- **Preview**: Pull requests get preview deployments
- **Domain**: https://rw-translate.denox.cc

## Manual Deployment

If needed, you can manually deploy using Wrangler CLI:

\`\`\`bash
npm run build
npx wrangler pages deploy out --project-name=rusted-workshop-translation-webui
\`\`\`

## Configuration

- Build command: `npm run build`
- Output directory: `out`
- Framework: Next.js (Static Export)
