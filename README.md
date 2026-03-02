# Leonardo Olivieri — Portfolio

Personal portfolio website. Dark, industrial aesthetic with smooth interactions and a hidden terminal easter egg.

🔗 **Live →** `<!-- your-url.vercel.app -->`

![Preview](./preview.png)

---

## ✦ Features

- Typewriter effect on hero roles
- Live age counter updated every second
- Custom cursor with smooth inertia ring
- Project cards that expand on hover
- Scroll reveal animations on every section
- Active section tracking in the navbar
- Hidden terminal with interactive commands
- Subtle grain texture overlay
- Fully responsive

---

## 🛠 Tech Stack

| Layer | Tech |
|---|---|
| Framework | React 18 + TypeScript |
| Bundler | Vite |
| Icons | Lucide React |
| Styling | CSS Custom Properties |
| Deploy | Vercel |

---

## 📁 Project Structure

```
src/
├── App.tsx                  # main layout & sections
├── main.tsx
├── styles/
│   └── global.css           # CSS variables, reset, keyframes
├── types/
│   └── index.ts             # TypeScript interfaces
├── data/
│   └── index.ts             # projects, skills, constants
├── hooks/
│   └── index.ts             # custom hooks
└── components/
    ├── Cursor.tsx
    ├── Nav.tsx
    ├── ProjectCard.tsx
    ├── SkillCard.tsx
    ├── Terminal.tsx
    └── UI.tsx
```

---

## 🚀 Getting Started

```bash
git clone https://github.com/your-username/portfolio
cd portfolio
npm install
npm run dev
```

```bash
npm run build   # production build
```

---

## ⚙️ Customization

All content lives in `src/data/index.ts`:

```ts
// your real birth date for the live counter
export const BIRTH_DATE = 'YYYY-MM-DD'

// add or edit projects
export const PROJECTS: Project[] = [...]

// edit your stack
export const SKILLS: Skill[] = [...]

// typewriter roles in the hero
export const ROLES: string[] = [...]
```

Contact links and email are in the Contact section of `src/App.tsx`.

---

## ☁️ Deploy

Push to GitHub, import on [vercel.com](https://vercel.com) — Vite is auto-detected, no config needed.

---

## 📄 License

No license