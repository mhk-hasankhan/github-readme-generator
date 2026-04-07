"use client";

import styles from "./LandingPage.module.css";

const FEATURES = [
  { icon: "⚡", title: "Instant Generation", desc: "Fill in your details and get a polished README in under a minute." },
  { icon: "🧰", title: "300+ Tech Badges", desc: "Pick from every framework, language, and tool you use." },
  { icon: "📊", title: "Live Stats Cards", desc: "GitHub stats, streaks, and language charts — all themed." },
  { icon: "🌐", title: "Social Hub", desc: "All your social profiles and donation links in one place." },
  { icon: "🏆", title: "Trophies & Fun", desc: "GitHub trophies, dev quotes, and random memes." },
  { icon: "⬡", title: "Zero Markdown", desc: "No coding knowledge needed. Just fill, copy, and paste." },
];

export default function LandingPage({ onStart }) {
  return (
    <div className={styles.page}>
      {/* Glow blobs */}
      <div className={styles.blobTop} />
      <div className={styles.blobBottom} />

      {/* Nav */}
      <nav className={styles.nav}>
        <div className={styles.logo}>
          <div className={styles.logoMark}>R</div>
          <span className={styles.logoText}>
            README<span className={styles.logoAccent}>FORGE</span>
          </span>
        </div>
        <button className={styles.navCta} onClick={onStart}>
          LAUNCH APP →
        </button>
      </nav>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroBadge}>
          <span className={styles.heroBadgeDot} />
          FREE · NO ACCOUNT · OPEN TOOL
        </div>

        <h1 className={styles.heroTitle}>
          Build your perfect<br />
          <span className={styles.heroAccent}>GitHub Profile</span> README
        </h1>

        <p className={styles.heroSubtitle}>
          A no-code generator for developers who want a standout GitHub presence
          without wrestling with Markdown syntax.
        </p>

        <div className={styles.heroCtas}>
          <button className={styles.ctaPrimary} onClick={onStart}>
            BUILD MY README →
          </button>
          <a
            href="https://github.com/mhk-hasankhan/github-readme-generator"
            target="_blank"
            rel="noreferrer"
            className={styles.ctaSecondary}
          >
            ★ Star on GitHub
          </a>
        </div>

        {/* Code Mockup */}
        <div className={styles.mockup}>
          <div className={styles.mockupBar}>
            <span className={styles.mockupDot} style={{ background: "#ff5f57" }} />
            <span className={styles.mockupDot} style={{ background: "#febc2e" }} />
            <span className={styles.mockupDot} style={{ background: "#28c840" }} />
            <span className={styles.mockupTitle}>README.md — ReadmeForge</span>
          </div>
          <div className={styles.mockupCode}>
            <span className={styles.codeTag}>{'<h1 align="center">'}</span>
            <span className={styles.codeText}>{"Hi 👋, I'm Priya"}</span>
            <span className={styles.codeTag}>{"</h1>"}</span>
            <br />
            <span className={styles.codeTag}>{'<h3 align="center">'}</span>
            <span className={styles.codeValue}>{"Senior full-stack engineer · Berlin"}</span>
            <span className={styles.codeTag}>{"</h3>"}</span>
            <br />
            <br />
            <span className={styles.codeMuted}>{"- 🔭 Working on "}</span>
            <span className={styles.codeBold}>{"**an AI-powered dev tool**"}</span>
            <br />
            <span className={styles.codeMuted}>{"- 🌱 Learning "}</span>
            <span className={styles.codeBold}>{"**Rust & WebAssembly**"}</span>
            <br />
            <br />
            <span className={styles.codeAttr}>
              {'<img src="https://github-readme-stats.vercel.app/api?username=priya&theme=tokyonight" />'}
            </span>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className={styles.features}>
        <div className={styles.featuresInner}>
          <h2 className={styles.featuresTitle}>
            Everything you need to{" "}
            <span className={styles.heroAccent}>stand out</span>
          </h2>
          <div className={styles.featureGrid}>
            {FEATURES.map((f) => (
              <div key={f.title} className={styles.featureCard}>
                <div className={styles.featureIcon}>{f.icon}</div>
                <div className={styles.featureName}>{f.title}</div>
                <div className={styles.featureDesc}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        READMEFORGE — BUILT FOR DEVELOPERS, BY DEVELOPERS
      </footer>

      <style>{`@keyframes pulse-dot { 0%,100%{opacity:1} 50%{opacity:0.3} }`}</style>
    </div>
  );
}
