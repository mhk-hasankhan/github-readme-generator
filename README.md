<div align="center">

<img src="https://img.shields.io/badge/ReadmeForge-7cffd4?style=for-the-badge&logo=github&logoColor=black" alt="ReadmeForge" />

# ReadmeForge

### Generate a stunning GitHub Profile README in under 60 seconds.

No Markdown knowledge required. Pick your tech, configure your stats, copy and paste.

[![Next.js](https://img.shields.io/badge/Next.js_14-000000?style=flat-square&logo=nextdotjs&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React_18-20232A?style=flat-square&logo=react&logoColor=61DAFB)](https://react.dev)
[![CSS Modules](https://img.shields.io/badge/CSS_Modules-000000?style=flat-square&logo=cssmodules&logoColor=white)](https://github.com/css-modules/css-modules)
[![License: MIT](https://img.shields.io/badge/License-MIT-7cffd4?style=flat-square)](LICENSE)

</div>

---

## 📖 Table of Contents

- [What is ReadmeForge?](#-what-is-readmeforge)
- [Features](#-features)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [How to Use the Generated README](#-how-to-use-the-generated-readme)
- [Customisation](#-customisation)
- [Tech Stack](#-tech-stack)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🔥 What is ReadmeForge?

ReadmeForge is a **no-code GitHub Profile README generator**. You fill in a form — your name, tech stack, social links, GitHub stats preferences — and it instantly generates clean, valid Markdown that you paste directly into your GitHub profile.

> **What is a GitHub Profile README?**
> GitHub has a special "secret" repository — a repo with the **same name as your username** — whose `README.md` is displayed publicly on your GitHub profile page. ReadmeForge generates the content for that file.

---

## ✨ Features

| Feature | Details |
|---|---|
| 🧰 **150+ Tech Badges** | Languages, Frontend, Backend, Databases, Cloud, Mobile, Tools, AI/ML |
| 📊 **GitHub Stats Cards** | Contribution stats, streak counter, top languages, trophies |
| 🎨 **33 Stat Themes** | tokyonight, dracula, radical, nord, and 29 more |
| 🌐 **14 Social Platforms** | Twitter/X, LinkedIn, YouTube, Dev.to, Medium, Stack Overflow, and more |
| ☕ **Donation Links** | Buy Me a Coffee, Ko-fi, Patreon, Open Collective |
| 🏆 **GitHub Trophies** | Auto-configured trophy widget |
| 🎉 **Fun Components** | Random dev quotes and dev memes |
| 👁️ **Live Preview** | Switch between raw Markdown and rendered preview in real time |
| ⎘ **Copy & Download** | One-click copy to clipboard or download as `README.md` |
| 🎨 **Dark UI** | Dark theme with CSS variables — easy to retheme |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js 18 or higher** — download from [nodejs.org](https://nodejs.org)
- **npm** (comes with Node.js)

Verify your installation:
```bash
node -v   # should print v18.x.x or higher
npm -v    # should print 9.x.x or higher
```

---

## 📁 Project Structure

```
readme-forge/
├── jsconfig.json              ← @/* alias configuration
├── next.config.js             ← Next.js config + image domains
├── package.json
└── src/
    ├── app/
    │   ├── layout.js          ← Root layout — Google Fonts, page metadata
    │   ├── page.js            ← Entry point (renders HomeClient)
    │   └── globals.css        ← CSS variables, base reset, scrollbar styles
    │
    ├── components/
    │   ├── HomeClient.jsx     ← Client router — switches between Landing and Builder
    │   ├── LandingPage.jsx    ← Marketing landing page with hero + features grid
    │   ├── BuilderPage.jsx    ← Main two-panel builder UI
    │   ├── PreviewPanel.jsx   ← Markdown/Preview tabs, Copy button, Download button
    │   ├── TechStackSection.jsx  ← Searchable badge picker with category tabs
    │   ├── StatsSection.jsx   ← GitHub stats toggles + live card previews
    │   ├── SocialsSection.jsx ← Social link inputs + donation inputs
    │   └── UI.jsx             ← Reusable primitives: Section, Field, Input,
    │                             Textarea, Toggle, Select, Chip
    │
    ├── data/
    │   └── techStack.js       ← All badge data, social platforms, stat themes,
    │                             donation platforms (single source of truth)
    │
    ├── hooks/
    │   └── useReadmeForm.js   ← All form state — updateField, updateNested,
    │                             toggleTech, resetForm
    │
    └── utils/
        └── readmeGenerator.js ← Pure function: formData → README.md string
                                  All badge/card URL builders live here
```

---

## 📋 How to Use the Generated README

Once you've filled in the form and your README looks good in the preview, follow these steps to display it on your GitHub profile.

---

### Step 1 — Create the special repository

> ⚠️ **This is the most important step.** GitHub displays a profile README only from a repository whose name **exactly matches your GitHub username**.

Go to [github.com/new](https://github.com/new) and fill in:

- **Repository name** → type your GitHub username exactly (e.g. if your username is `johndoe`, type `johndoe`)
- **Visibility** → ✅ Public
- **Initialize this repository with a README** → ✅ Check this box

Click **Create repository**.

GitHub will show a special green banner confirming this is your profile repository:

```
✨ johndoe/johndoe is a special repository.
   Its README.md will appear on your public profile!
```

---

### Step 2 — Open the README editor

Inside your new repository, click the `README.md` file, then click the **pencil icon ✏️** in the top right of the file viewer to open the editor.

Select **all** the existing content (`Ctrl+A` / `Cmd+A`) and delete it.

---

### Step 3 — Paste your generated README

Go back to **ReadmeForge** and click the **⎘ Copy README** button.

Paste the copied content into the GitHub editor (`Ctrl+V` / `Cmd+V`).

> Alternatively, click **↓ Download** to get a `README.md` file, then upload it directly to your repository.

---

### Step 4 — Commit the file

Scroll down on the GitHub editor page, add an optional commit message like `"Add profile README"`, and click **Commit changes**.

Visit `https://github.com/your-username` to see your new profile README live! 🎉

---

## 🎨 Customisation

### Changing the accent colour

All colours are CSS variables in `src/app/globals.css`:

```css
:root {
  --bg:             #090a0d;   /* page background */
  --surface:        #0f1117;   /* card/panel background */
  --surface-raised: #14171f;   /* elevated surface */
  --border:         #1c2030;   /* border colour */
  --accent:         #7cffd4;   /* ← change this to your preferred accent */
  --text-primary:   #e2e8f0;   /* main text */
  --text-secondary: #7a8599;   /* secondary text */
  --text-muted:     #3d4555;   /* placeholder / muted text */
}
```

### Adding more tech badges

Open `src/data/techStack.js` and add to any category's `items` array:

```js
{
  id: "mytool",          // unique ID, no spaces
  label: "My Tool",      // badge display text
  color: "FF6600",       // hex background colour (no #)
  logo: "mytool",        // simple-icons slug — find at simpleicons.org
  logoColor: "white",    // "white" or "black"
}
```

### Adding more social platforms

Add to the `SOCIAL_PLATFORMS` array in `src/data/techStack.js` following the same shape as existing entries, including `badgeLabel`, `badgeColor`, `badgeLogo`, and `prefix`.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| [Next.js 14](https://nextjs.org) | React framework, App Router |
| [React 18](https://react.dev) | UI rendering |
| [CSS Modules](https://github.com/css-modules/css-modules) | Scoped component styles |
| [Google Fonts](https://fonts.google.com) | Space Mono + DM Sans |
| [shields.io](https://shields.io) | Tech badge image generation |
| [github-readme-stats](https://github.com/anuraghazra/github-readme-stats) | Stats + language cards |
| [github-readme-streak-stats](https://github.com/DenverCoder1/github-readme-streak-stats) | Streak card |
| [github-profile-trophy](https://github.com/ryo-ma/github-profile-trophy) | Trophy widget |
| [visitcount.itsvg.in](https://visitcount.itsvg.in) | Visitor counter |

No external UI library — all components are built from scratch.

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m "feat: add my feature"`
4. Push: `git push origin feature/my-feature`
5. Open a Pull Request

**Good first contributions:**
- Add missing tech badges to `src/data/techStack.js`
- Add more social platform options
- Improve the Markdown preview renderer
- Add new fun components

---

## 📄 License

MIT — free to use, modify, and distribute.

---

<div align="center">

Made with ❤️ for the developer community

**[⭐ Star this repo](https://github.com) · [🐛 Report a Bug](https://github.com) · [💡 Request a Feature](https://github.com)**

</div>
