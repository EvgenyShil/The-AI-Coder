
# Схема: ИИ‑программист (модуль/агент)

Готовый проект Next.js + Tailwind + TypeScript. Показывает интерактивную схему сценария с модулем VS Code, агентом и локальной моделью GigaCode/Cotype.

## Локальный запуск
```bash
npm i
npm run dev
# открыть http://localhost:3000
```

## Деплой на Vercel (через GitHub)
1. Создайте новый репозиторий и запушьте проект:
   ```bash
   git init
   git add -A
   git commit -m "init diagram site"
   git branch -M main
   git remote add origin https://github.com/<user>/<repo>.git
   git push -u origin main
   ```
2. Зайдите в https://vercel.com → **New Project** → **Import Git Repository** → выберите ваш репозиторий.
3. Framework: **Next.js** — Vercel определит автоматически. Жмите **Deploy**.

## Деплой на Vercel (через CLI, без GitHub)
```bash
npm i -g vercel
vercel login
vercel        # первый запуск создаст превью
vercel --prod # прод-версия
```

## Структура
- `pages/index.tsx` — рендерит компонент схемы
- `components/Diagram.tsx` — сама схема
- `styles/globals.css` — Tailwind
- `tailwind.config.js`, `postcss.config.js` — конфиги

Зависимости: `next`, `react`, `react-dom`, `lucide-react`, а также tailwind/postcss/autoprefixer в dev-зависимостях.
