import {
  ArrowRight,
  Check,
  Sparkles,
  Zap,
} from "lucide-react";

import styles from "./ThemeLab.module.css";

const themes = [
  // =========================================
  // GENERAL PURPOSE
  // =========================================
  {
    name: "Cyber",
    theme: "cyber",
    category: "General Purpose",
    description: "Technical, futuristic, energetic",
  },
  {
    name: "Aurora",
    theme: "aurora",
    category: "General Purpose",
    description: "Creative, immersive, AI-friendly",
  },
  {
    name: "Luxury",
    theme: "luxury",
    category: "General Purpose",
    description: "Premium, elegant, editorial",
  },
  {
    name: "Minimal",
    theme: "minimal",
    category: "General Purpose",
    description: "Clean, professional, focused",
  },
  {
    name: "Brutalist",
    theme: "brutalist",
    category: "General Purpose",
    description: "Bold, experimental, expressive",
  },

  // =========================================
  // PROBLEM SPACE
  // =========================================
  {
    name: "Eco",
    theme: "eco",
    category: "Problem Space",
    description: "Environment, sustainability, climate",
  },
  {
    name: "Civic",
    theme: "civic",
    category: "Problem Space",
    description: "Smart city, municipal, public services",
  },
  {
    name: "Resolve",
    theme: "resolve",
    category: "Problem Space",
    description: "Issue reporting, complaints, grievance",
  },
  {
    name: "Vital",
    theme: "vital",
    category: "Problem Space",
    description: "Healthcare, public health, wellness",
  },
  {
    name: "Learn",
    theme: "learn",
    category: "Problem Space",
    description: "Education, students, learning",
  },
  {
    name: "Agri",
    theme: "agri",
    category: "Problem Space",
    description: "Agriculture, farming, rural technology",
  },
  {
    name: "Transit",
    theme: "transit",
    category: "Problem Space",
    description: "Traffic, transport, mobility",
  },
  {
    name: "Relief",
    theme: "relief",
    category: "Problem Space",
    description: "Disaster management, emergency response",
  },
];

const modes = ["dark", "light"];

/* =========================================
   GITHUB ICON
========================================= */

function GithubIcon({ size = 20 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2.17c-3.2.69-3.88-1.36-3.88-1.36-.53-1.34-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.67 1.24 3.32.95.1-.74.4-1.24.73-1.52-2.55-.29-5.23-1.28-5.23-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.76.11 3.05.73.81 1.18 1.84 1.18 3.1 0 4.42-2.69 5.4-5.25 5.68.41.36.78 1.07.78 2.16v3.2c0 .31.21.68.8.56A10.99 10.99 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

/* =========================================
   THEME PREVIEW
========================================= */

function ThemePreview({
  theme,
  mode,
  name,
  description,
  category,
}) {
  return (
    <section
      className={styles.preview}
      data-theme={theme}
      data-mode={mode}
    >
      {/* Header */}
      <div className={styles.previewHeader}>
        <div>
          <div className={styles.previewMeta}>
            <span className={styles.previewCategory}>{category}</span>

            <span className={styles.previewMode}>
              <span />
              {mode}
            </span>
          </div>

          <div className={styles.previewTitleRow}>
            <h2>{name}</h2>
          </div>

          <p className={styles.previewDescription}>{description}</p>
        </div>
      </div>

      {/* Fake Navbar */}
      <div className={styles.fakeNavbar}>
        <div className={styles.fakeLogo}>
          <span className={styles.logoMark}>
            <Sparkles size={13} />
          </span>

          <span>ProjectX</span>
        </div>

        <div className={styles.fakeNavLinks}>
          <span>Features</span>
          <span>How it works</span>
          <span>About</span>
        </div>

        <button className={`${styles.button} ${styles.buttonPrimary}`}>
          Launch
          <ArrowRight size={14} />
        </button>
      </div>

      {/* Hero */}
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.badge}>
            <Zap size={13} />
            BUILD FASTER
          </span>

          <h2>
            Build something
            <span> extraordinary.</span>
          </h2>

          <p>
            A reusable interface foundation for ambitious hackathon projects
            and rapid product builds.
          </p>

          <div className={styles.heroActions}>
            <button
              className={`${styles.button} ${styles.buttonPrimary}`}
            >
              Get Started
              <ArrowRight size={15} />
            </button>

            <button
              className={`${styles.button} ${styles.buttonSecondary}`}
            >
              <GithubIcon size={15} />
              GitHub
            </button>
          </div>
        </div>

        <div className={styles.visual}>
          <div className={styles.visualGlow} />

          <div className={styles.visualCard}>
            <div className={styles.visualCardTop}>
              <span>System Status</span>

              <span className={styles.status}>
                <span />
                Online
              </span>
            </div>

            <div className={styles.visualLine} />
            <div className={styles.visualLineShort} />

            <div className={styles.visualMetrics}>
              <div>
                <strong>98%</strong>
                <span>Performance</span>
              </div>

              <div>
                <strong>24ms</strong>
                <span>Latency</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Component Samples */}
      <div className={styles.componentGrid}>
        {/* Feature Card */}
        <div className={styles.sampleCard}>
          <div className={styles.cardHeader}>
            <div>
              <span className={styles.cardEyebrow}>FEATURE</span>
              <h3>Smart automation</h3>
            </div>

            <span className={styles.iconBox}>
              <Sparkles size={16} />
            </span>
          </div>

          <p>
            Components inherit the active theme automatically through
            semantic design tokens.
          </p>

          <div className={styles.cardFooter}>
            <span>Ready</span>
            <Check size={14} />
          </div>
        </div>

        {/* Input Card */}
        <div className={styles.sampleCard}>
          <span className={styles.cardEyebrow}>INPUT</span>

          <label className={styles.inputLabel}>
            Project name
          </label>

          <div className={styles.input}>
            Hackathon Project
          </div>

          <div className={styles.sampleActions}>
            <button
              className={`${styles.button} ${styles.buttonPrimary}`}
            >
              Save
            </button>

            <button
              className={`${styles.button} ${styles.buttonGhost}`}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

      {/* Palette */}
      <div className={styles.palette}>
        <div>
          <span
            className={styles.swatch}
            style={{
              background: "var(--bg-primary)",
            }}
          />

          <small>Background</small>
        </div>

        <div>
          <span
            className={styles.swatch}
            style={{
              background: "var(--surface-1)",
            }}
          />

          <small>Surface</small>
        </div>

        <div>
          <span
            className={styles.swatch}
            style={{
              background: "var(--accent-primary)",
            }}
          />

          <small>Primary</small>
        </div>

        <div>
          <span
            className={styles.swatch}
            style={{
              background: "var(--accent-secondary)",
            }}
          />

          <small>Secondary</small>
        </div>
      </div>
    </section>
  );
}

/* =========================================
   THEME LAB
========================================= */

function ThemeLab() {
  return (
    <main className={styles.page}>
      {/* Page Header */}
      <header className={styles.pageHeader}>
        <div>
          <span className={styles.pageEyebrow}>
            DESIGN SYSTEM
          </span>

          <h1>Theme Lab</h1>

          <p>
            Compare the same interface across every visual theme
            and color mode.
          </p>
        </div>

        <div className={styles.legend}>
          <span>26 Variations</span>
          <span>13 Themes</span>
          <span>2 Modes</span>
        </div>
      </header>

      {/* =====================================
          GENERAL PURPOSE
      ===================================== */}

      <section className={styles.themeGroup}>
        <div className={styles.groupHeader}>
          <div>
            <span className={styles.groupEyebrow}>
              COLLECTION 01
            </span>

            <h2>General Purpose</h2>

            <p>
              Flexible visual identities for open-ended hackathon
              projects.
            </p>
          </div>

          <span className={styles.groupCount}>
            5 themes · 10 variations
          </span>
        </div>

        <div className={styles.previewGrid}>
          {themes
            .filter(
              (theme) => theme.category === "General Purpose"
            )
            .map((theme) =>
              modes.map((mode) => (
                <ThemePreview
                  key={`${theme.theme}-${mode}`}
                  {...theme}
                  mode={mode}
                />
              ))
            )}
        </div>
      </section>

      {/* =====================================
          PROBLEM SPACE
      ===================================== */}

      <section className={styles.themeGroup}>
        <div className={styles.groupHeader}>
          <div>
            <span className={styles.groupEyebrow}>
              COLLECTION 02
            </span>

            <h2>Problem Space</h2>

            <p>
              Purpose-built visual identities for common hackathon
              problem domains.
            </p>
          </div>

          <span className={styles.groupCount}>
            8 themes · 16 variations
          </span>
        </div>

        <div className={styles.previewGrid}>
          {themes
            .filter(
              (theme) => theme.category === "Problem Space"
            )
            .map((theme) =>
              modes.map((mode) => (
                <ThemePreview
                  key={`${theme.theme}-${mode}`}
                  {...theme}
                  mode={mode}
                />
              ))
            )}
        </div>
      </section>
    </main>
  );
}

export default ThemeLab;