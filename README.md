# Môžeš hovoriť? – AI sprievodkyňa Mila

Tento projekt je jednoduchá webová aplikácia postavená na Next.js + React, využívajúca OpenAI ChatGPT na poskytnutie psychologickej podpory cez textový chat.

## 🔧 Inštalácia

1. Naklonuj alebo rozbaľ projekt:
   ```
   npm install
   ```

2. Vytvor `env_local` súbor a vlož svoj OpenAI API kľúč:
   ```
   OPENAI_API_KEY=sk-...
   ```

3. V kóde môžeš tento súbor načítať ako `.env.local` alebo ho pri deploy nahradiť Vercel Environment Variable.

4. Spusti aplikáciu lokálne:
   ```
   npm run dev
   ```

5. Deploy na Vercel: [https://vercel.com](https://vercel.com)

## 📁 Štruktúra
- `pages/index.js` – hlavná stránka
- `components/MilaChat.js` – logika chatu
- `pages/api/chat.js` – komunikácia s OpenAI
