import { SOCIAL_PLATFORMS, DONATION_PLATFORMS } from "@/data/techStack";

// ─── Badge URL Builders ───────────────────────────────────────────────────────

export function buildBadgeUrl(tech) {
  return `https://img.shields.io/badge/${encodeURIComponent(tech.label)}-${tech.color}?style=for-the-badge&logo=${tech.logo}&logoColor=${tech.logoColor}`;
}

export function buildStatsCard(username, theme) {
  const params = new URLSearchParams({ username, theme, hide_border: "true" });
  return `https://github-readme-stats.vercel.app/api?${params}`;
}

export function buildStreakCard(username, theme) {
  return `https://github-readme-streak-stats.herokuapp.com/?user=${username}&theme=${theme}`;
}

export function buildLangsCard(username, theme) {
  const params = new URLSearchParams({ username, theme, layout: "compact", hide_border: "true" });
  return `https://github-readme-stats.vercel.app/api/top-langs/?${params}`;
}

export function buildTrophiesUrl(username, theme) {
  return `https://github-profile-trophy.vercel.app/?username=${username}&theme=${theme}&no-frame=true&row=1`;
}

export function buildVisitorBadge(username) {
  return `https://visitcount.itsvg.in/api?id=${username}&icon=5&color=6`;
}

export function buildSocialBadge(platformId) {
  const p = SOCIAL_PLATFORMS.find((pl) => pl.id === platformId);
  if (!p) return "";
  return `https://img.shields.io/badge/${p.badgeLabel}-${p.badgeColor}?style=for-the-badge&logo=${p.badgeLogo}&logoColor=white`;
}

export function buildSocialHref(platformId, value) {
  const p = SOCIAL_PLATFORMS.find((pl) => pl.id === platformId);
  if (!p) return value;
  return p.prefix ? `${p.prefix}${value}` : value;
}

export function buildDonationBadge(platformId) {
  const p = DONATION_PLATFORMS.find((pl) => pl.id === platformId);
  if (!p) return "";
  return `https://img.shields.io/badge/${p.badgeLabel}-${p.badgeColor}?style=for-the-badge&logo=${p.badgeLogo}&logoColor=${p.badgeLogoColor}`;
}

export function buildDonationHref(platformId, value) {
  const p = DONATION_PLATFORMS.find((pl) => pl.id === platformId);
  if (!p) return value;
  return `${p.prefix}${value}`;
}

// ─── Main Generator ───────────────────────────────────────────────────────────

export function generateReadme(form) {
  const {
    username, name, subtitle, about,
    socials = {}, techStack = [], donations = {},
    githubStats, showStreak, showLangs, showTrophies,
    showVisitors, statTheme = "tokyonight",
    funComponents = {}, workingOn, learningNow,
    collaborateOn, pronouns, funFact,
  } = form;

  if (!username) return "";

  const lines = [];

  // ── Header ──────────────────────────────────────────────────────────────────
  if (name) lines.push(`<h1 align="center">Hi 👋, I'm ${name}</h1>`);
  if (subtitle) lines.push(`<h3 align="center">${subtitle}</h3>`);
  if (name || subtitle) lines.push("");

  // ── Visitor badge ────────────────────────────────────────────────────────────
  if (showVisitors) {
    lines.push(`<p align="left"><img src="${buildVisitorBadge(username)}" alt="visitor badge" /></p>`);
    lines.push("");
  }

  // ── Bio bullets ─────────────────────────────────────────────────────────────
  const bullets = [
    workingOn && `🔭 I'm currently working on **${workingOn}**`,
    learningNow && `🌱 I'm currently learning **${learningNow}**`,
    collaborateOn && `👯 I'm looking to collaborate on **${collaborateOn}**`,
    pronouns && `😄 Pronouns: **${pronouns}**`,
    funFact && `⚡ Fun fact: ${funFact}`,
  ].filter(Boolean);

  if (bullets.length) {
    bullets.forEach((b) => lines.push(`- ${b}`));
    lines.push("");
  }

  // ── Freeform bio ─────────────────────────────────────────────────────────────
  if (about) {
    lines.push(about);
    lines.push("");
  }

  // ── Social badges ─────────────────────────────────────────────────────────────
  const socialEntries = Object.entries(socials).filter(([, v]) => v);
  if (socialEntries.length) {
    lines.push(`<h3 align="left">Connect with me:</h3>`);
    lines.push(`<p align="left">`);
    socialEntries.forEach(([id, value]) => {
      lines.push(`<a href="${buildSocialHref(id, value)}" target="_blank"><img src="${buildSocialBadge(id)}" alt="${id}" /></a>`);
    });
    lines.push(`</p>`);
    lines.push("");
  }

  // ── Tech stack badges ──────────────────────────────────────────────────────
  if (techStack.length) {
    lines.push(`<h3 align="left">Languages and Tools:</h3>`);
    lines.push(`<p align="left">`);
    techStack.forEach((tech) => {
      lines.push(`<img src="${buildBadgeUrl(tech)}" alt="${tech.label}" />`);
    });
    lines.push(`</p>`);
    lines.push("");
  }

  // ── GitHub Stats ──────────────────────────────────────────────────────────
  if (githubStats || showStreak || showLangs) {
    lines.push(`<h3 align="left">GitHub Stats:</h3>`);
    lines.push("");
    lines.push(`<p align="center">`);
    if (githubStats) lines.push(`  <img src="${buildStatsCard(username, statTheme)}" alt="GitHub Stats" />`);
    if (showStreak)  lines.push(`  <img src="${buildStreakCard(username, statTheme)}" alt="Streak Stats" />`);
    if (showLangs)   lines.push(`  <img src="${buildLangsCard(username, statTheme)}" alt="Top Languages" />`);
    lines.push(`</p>`);
    lines.push("");
  }

  // ── Trophies ──────────────────────────────────────────────────────────────
  if (showTrophies) {
    lines.push(`<h3 align="left">🏆 GitHub Trophies:</h3>`);
    lines.push("");
    lines.push(`![](${buildTrophiesUrl(username, statTheme)})`);
    lines.push("");
  }

  // ── Fun components ────────────────────────────────────────────────────────
  if (funComponents.quotes) {
    lines.push(`---`);
    lines.push(`[![Readme Quotes](https://quotes-github-readme.vercel.app/api?type=horizontal&theme=${statTheme})](https://github.com/piyushsuthar/github-readme-quotes)`);
    lines.push("");
  }

  if (funComponents.memes) {
    lines.push(`### 😂 Random Dev Meme`);
    lines.push(`<img src='https://memer-new.vercel.app/' style="height: 400px;"/>`);
    lines.push("");
  }

  // ── Donation links ────────────────────────────────────────────────────────
  const donationEntries = Object.entries(donations).filter(([, v]) => v);
  if (donationEntries.length) {
    lines.push(`<h3 align="left">Support:</h3>`);
    lines.push(`<p>`);
    donationEntries.forEach(([id, value]) => {
      lines.push(`<a href="${buildDonationHref(id, value)}"><img src="${buildDonationBadge(id)}" /></a>`);
    });
    lines.push(`</p>`);
    lines.push("");
  }

  return lines.join("\n").trim();
}
