# Hackathon Boilerplate — Design System

> **Purpose:** This document is the source of truth for the visual design system, theme architecture, styling conventions, and implementation rules used by the Hackathon Boilerplate.
>
> **Stack:** React + Vite + JavaScript + CSS Modules

---

## 1. Design Philosophy

The boilerplate is designed to make future hackathon projects faster to build without sacrificing visual quality.

The core principle is:

```text
Stable structure
      +
Reusable components
      +
Semantic design tokens
      +
Swappable themes
      +
Independent light/dark modes
      =
Fast project customization
```

A future project should primarily require changing:

- content
- images/assets
- section composition
- feature-specific components
- theme selection

It should **not** require rebuilding the visual foundation from scratch.

---

# 2. Design System Architecture

The visual system follows this hierarchy:

```text
                    DESIGN SYSTEM
                          │
          ┌───────────────┴───────────────┐
          │                               │
      VISUAL THEME                     COLOR MODE
          │                               │
   Cyber / Aurora /                Dark / Light
   Luxury / Minimal /
   Brutalist
          │                               │
          └───────────────┬───────────────┘
                          ↓
                  SEMANTIC TOKENS
                          ↓
                REUSABLE COMPONENTS
                          ↓
                      SECTIONS
                          ↓
                        PAGES
```

### Theme

A theme defines the **personality** of the interface.

It controls things such as:

- primary accent
- secondary accent
- border character
- radius language
- glow style
- grid/effect style
- glass treatment
- shadow personality

### Mode

Mode defines the **visual environment**.

It controls:

- background colors
- surfaces
- text colors
- border contrast
- glass surfaces
- shadow intensity
- mode-specific glow/grid adjustments

Theme and mode are deliberately independent.

---

# 3. Theme + Mode Representation

The application uses two data attributes on the root HTML element:

```html
<html data-theme="cyber" data-mode="dark">
```

The theme is changed independently from the mode.

Example:

```js
document.documentElement.dataset.theme = "aurora";
document.documentElement.dataset.mode = "light";
```

This produces:

```text
Aurora + Light
```

The root-level attributes are intentional. They allow the entire document, including `body`, overlays, modals, and portal-based UI, to access the active design tokens.

---

# 4. Current Theme Collection

The boilerplate currently targets five core themes.

| Theme | Personality | Primary Use Cases |
|---|---|---|
| Cyber | Technical, futuristic, energetic | AI, cybersecurity, developer tools, robotics |
| Aurora | Creative, immersive, dreamy | AI, consumer apps, wellness, creative products |
| Luxury | Premium, elegant, editorial | Premium products, fintech, high-end services |
| Minimal | Clean, professional, focused | SaaS, productivity, education, dashboards |
| Brutalist | Bold, raw, experimental | Creative concepts, youth products, experimental hackathons |

Each theme has two deliberately designed modes:

```text
Cyber      → Dark / Light
Aurora     → Dark / Light
Luxury     → Dark / Light
Minimal    → Dark / Light
Brutalist  → Dark / Light
```

Total target configurations:

```text
5 themes × 2 modes = 10 visual configurations
```

---

# 5. Cyber Theme

## Personality

Cyber should feel:

- technical
- futuristic
- energetic
- precise
- developer-oriented

Core visual language:

- cyan primary accent
- violet secondary accent
- subtle technical grid
- restrained glassmorphism
- thin borders
- moderate corner radius
- controlled glow

### Cyber Dark

Conceptual palette:

```text
Background    #05070A
Surface       #0B1016
Elevated      #111923
Text          #F5F7FA
Muted         #8E9AAA
Primary       #00D9FF
Secondary     #7C3CFF
```

The dark version can use cyan/violet glow and technical grid effects.

### Cyber Light

Conceptual palette:

```text
Background    #F4F8FA
Surface       #FFFFFF
Elevated      #EDF4F7
Text          #0B1117
Muted         #586574
Primary       #009FC2
Secondary     #6740D8
```

Cyber Light should remain technical rather than becoming a generic corporate white theme.

---

# 6. Aurora Theme

## Personality

Aurora should feel:

- futuristic
- creative
- immersive
- soft
- expressive

Core visual language:

- purple primary accent
- pink secondary accent
- blurred gradients
- floating glow
- softer glass
- larger radii
- subtle depth

### Aurora Dark

```text
Background    #070817
Surface       #0F1126
Elevated      #171A38
Text          #F8F8FF
Muted         #979AB7
Primary       #9A86FF
Secondary     #FF62D1
```

### Aurora Light

```text
Background    #F7F5FC
Surface       #FFFFFF
Elevated      #F0ECFA
Text          #171522
Muted         #6B6878
Primary       #715DE0
Secondary     #D946A8
```

Aurora Light should feel like a soft editorial interface with futuristic color rather than a simple recoloring of the dark version.

---

# 7. Luxury Theme

## Personality

Luxury should feel:

- premium
- elegant
- quiet
- editorial
- deliberate

Avoid:

- excessive neon
- excessive glow
- oversized visual effects
- overly playful radii

Core visual language:

- champagne/gold accents
- strong whitespace
- restrained shadows
- thin borders
- smaller radii
- high visual contrast through typography and spacing

### Luxury Dark

```text
Background    #080706
Surface       #12100E
Elevated      #1A1713
Text          #F5EFE3
Muted         #9C9385
Primary       #D6B36A
Secondary     #F0D99A
```

### Luxury Light

```text
Background    #F5F1E8
Surface       #FFFDF8
Elevated      #EEE7D9
Text          #1A1814
Muted         #726B60
Primary       #9C702B
Secondary     #C29A52
```

Luxury should rely more on spacing, typography, and material contrast than on bright visual effects.

---

# 8. Minimal Theme

## Personality

Minimal should feel:

- clean
- professional
- calm
- focused
- highly readable

Core visual language:

- restrained effects
- neutral palette
- typography-led hierarchy
- moderate radii
- subtle shadows
- very little decorative glow

### Minimal Dark

```text
Background    #111111
Surface       #181818
Elevated      #202020
Text          #F5F5F5
Muted         #777777
Primary       #F5F5F5
Secondary     #BDBDBD
```

Important:

The dark mode uses a **light primary accent**. This is deliberate because a black accent would disappear against the dark background.

### Minimal Light

```text
Background    #FAFAF8
Surface       #FFFFFF
Elevated      #F1F1EE
Text          #111111
Muted         #888888
Primary       #111111
Secondary     #444444
```

Minimal is the strongest candidate for professional SaaS, productivity, education, and dashboard-style projects.

---

# 9. Brutalist Theme

## Personality

Brutalist should feel:

- bold
- raw
- experimental
- high contrast
- intentionally unconventional

Core visual language:

- very small or zero radius
- strong borders
- hard shadows
- oversized typography
- orange + blue accents
- asymmetry where appropriate

### Brutalist Dark

```text
Background    #0D0D0D
Surface       #151515
Elevated      #202020
Text          #FFFFFF
Muted         #A5A5A5
Primary       #FF5A00
Secondary     #2F6BFF
```

### Brutalist Light

```text
Background    #F3EFE5
Surface       #FFFFFF
Elevated      #E5DED0
Text          #000000
Muted         #555555
Primary       #FF4B00
Secondary     #1557FF
```

Brutalist should feel closer to a designed physical poster or editorial artifact than a conventional SaaS interface.

---

# 10. Semantic Design Tokens

Components must consume semantic tokens instead of hardcoded theme colors.

Preferred:

```css
.card {
  background: var(--surface-1);
  color: var(--text-primary);
  border: 1px solid var(--border-default);
}
```

Avoid:

```css
.card {
  background: #111111;
  color: white;
  border: 1px solid #333333;
}
```

### Core token groups

```text
Background
--bg-primary
--bg-secondary

Surface
--surface-1
--surface-2
--surface-3

Typography
--text-primary
--text-secondary
--text-muted

Brand
--accent-primary
--accent-secondary

Borders
--border-subtle
--border-default
--border-strong

Effects
--glow-primary
--glow-secondary
--grid-color
--glass-background
--glass-border
--glass-blur

Shadow
--shadow-sm
--shadow-md
--shadow-lg

Shape
--radius-sm
--radius-md
--radius-lg
--radius-xl
--radius-full
```

The naming describes the **role** of a value rather than its literal color.

---

# 11. Global Tokens

Global tokens are values that should normally remain consistent across themes.

### Container

```css
--container-width: 1200px;
--container-padding: 24px;
```

### Typography

```css
--font-body
--font-display
--font-mono
```

### Spacing

```css
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 20px;
--space-6: 24px;
--space-8: 32px;
--space-10: 40px;
--space-12: 48px;
--space-16: 64px;
--space-20: 80px;
--space-24: 96px;
--space-32: 128px;
```

### Motion

```css
--transition-fast: 150ms ease;
--transition-normal: 250ms ease;
--transition-slow: 450ms ease;
```

These become the default vocabulary for spacing and interaction across the component library.

---

# 12. Typography Rules

Typography should create hierarchy before decorative effects do.

General hierarchy:

```text
Display / Hero
        ↓
Section heading
        ↓
Card heading
        ↓
Body text
        ↓
Secondary / metadata
        ↓
Mono labels / technical data
```

Use:

- `--font-display` for major headings and visual hero text
- `--font-body` for normal interface content
- `--font-mono` for technical labels, statuses, metadata, and system-like information

Do not use excessive font weights or decorative typography in every component.

---

# 13. Spacing Rules

Use the spacing scale instead of arbitrary values whenever possible.

Example:

```css
padding: var(--space-6);
gap: var(--space-4);
margin-top: var(--space-8);
```

Preferred:

```text
8 → 12 → 16 → 24 → 32 → 48 → 64 → 96
```

Avoid repeatedly introducing arbitrary values like:

```text
17px
23px
37px
53px
```

unless there is a visual reason that requires them.

---

# 14. Radius Rules

Theme radius is part of the personality system.

### Soft / modern themes

Aurora can use larger radii.

### Refined themes

Luxury should use smaller, quieter radii.

### Minimal

Moderate radii keep the design clean without becoming overly soft.

### Brutalist

Radii should be minimal or zero.

Components must reference radius tokens:

```css
border-radius: var(--radius-md);
```

not hardcoded values.

---

# 15. Shadow Rules

Shadows must support hierarchy, not decoration.

```text
shadow-sm → subtle component elevation
shadow-md → cards / important surfaces
shadow-lg → hero visuals / major overlays
```

Brutalist uses hard offset shadows instead of blurred shadows.

Example:

```css
--shadow-md: 8px 8px 0 var(--text-primary);
```

This is intentional and is part of Brutalist's visual language.

---

# 16. Glass Rules

Glass effects are optional and theme-dependent.

Use:

```css
background: var(--glass-background);
border: 1px solid var(--glass-border);
backdrop-filter: blur(var(--glass-blur));
```

Do not assume that every component must use glass.

Luxury and Minimal should generally use glass more sparingly than Aurora or Cyber.

Brutalist intentionally minimizes or disables blur-based glass.

---

# 17. Glow Rules

Glow is an accent, not the main visual system.

Good:

```css
box-shadow: 0 0 40px var(--glow-primary);
```

Bad:

```css
/* Everything glows */
```

Recommended intensity:

- Cyber → moderate
- Aurora → soft and larger
- Luxury → very restrained
- Minimal → generally none
- Brutalist → none

---

# 18. Grid / Background Effects

The background grid is optional and theme-controlled.

Example:

```css
background-image:
  linear-gradient(
    to right,
    var(--grid-color) 1px,
    transparent 1px
  ),
  linear-gradient(
    to bottom,
    var(--grid-color) 1px,
    transparent 1px
  );
```

Do not hardcode a grid color inside a component.

Themes can set:

```css
--grid-color: transparent;
```

to disable the effect completely.

---

# 19. Component Styling Rules

Every reusable component should follow this structure:

```text
Component/
├── Component.jsx
└── Component.module.css
```

Example:

```text
src/components/common/Button/
├── Button.jsx
└── Button.module.css
```

CSS Modules are the default for component-specific styling.

Global CSS should be reserved for:

- reset
- root styles
- theme tokens
- shared global typography/base behavior
- global document-level concerns

---

# 20. Component Contract

Reusable components should expose behavior through props instead of theme-specific implementation.

Example:

```jsx
<Button variant="primary">
  Launch Project
</Button>
```

or:

```jsx
<Button variant="ghost">
  Learn More
</Button>
```

The component should consume semantic variables internally.

Do not write a separate Cyber Button, Aurora Button, etc.

The same Button should automatically adapt.

---

# 21. Responsive Design

Responsive behavior is part of the component contract, not an optional later step.

The UI should work across:

```text
Desktop
Tablet
Mobile
Small mobile
```

Prefer fluid sizing for major typography and spacing where useful.

Example:

```css
font-size: clamp(40px, 6vw, 76px);
```

Use media queries when layout structure actually needs to change.

---

# 22. Theme Lab

A Theme Lab is used to compare the design system before building the full component library.

The lab currently previews:

- navbar
- hero
- buttons
- badge
- card
- status indicator
- input
- palette swatches

It renders the same interface across:

```text
Cyber Dark
Cyber Light
Aurora Dark
Aurora Light
Luxury Dark
Luxury Light
Minimal Dark
Minimal Light
Brutalist Dark
Brutalist Light
```

The Theme Lab exists to catch:

- contrast failures
- invisible text
- weak borders
- inconsistent surfaces
- theme identity problems
- light/dark token conflicts

The Theme Lab should be updated whenever the core token system changes significantly.

---

# 23. Contrast Rule

A token must remain readable against every surface where it is used.

A semantic token may change between light and dark mode if necessary.

Example from Minimal:

```text
Minimal Light
accent-primary = dark
background     = light

Minimal Dark
accent-primary = light
background     = dark
```

This is intentional.

**Semantic consistency is more important than forcing a literal color to remain unchanged across modes.**

---

# 24. Creating a New Theme

When adding a new theme:

### Step 1 — Define its personality

Answer:

```text
What should this theme feel like?
What projects should use it?
What visual language distinguishes it?
```

### Step 2 — Define theme-level identity

Set:

```css
--accent-primary
--accent-secondary
--radius-*
--glow-*
--grid-color
--shadow-*
--glass-*
```

### Step 3 — Create dark mode

Define:

```css
[data-theme="new-theme"][data-mode="dark"] {
  ...
}
```

### Step 4 — Create light mode

Define:

```css
[data-theme="new-theme"][data-mode="light"] {
  ...
}
```

### Step 5 — Test in Theme Lab

Every new theme must be tested alongside existing themes.

---

# 25. Creating Dark/Light Variants

Do not simply invert colors.

Instead, design each mode intentionally.

Dark mode usually needs:

- lower background luminance
- bright readable text
- controlled border contrast
- deeper shadows

Light mode usually needs:

- brighter surfaces
- dark readable text
- softer shadows
- carefully tuned accent contrast

A theme is successful when both modes still feel like the **same design family**.

---

# 26. Do / Don't

## Do

```css
color: var(--text-primary);
background: var(--surface-1);
border: 1px solid var(--border-default);
box-shadow: var(--shadow-md);
border-radius: var(--radius-md);
```

## Don't

```css
color: #ffffff;
background: #111111;
border: 1px solid #333333;
box-shadow: 0 10px 40px #000000;
border-radius: 14px;
```

Use semantic tokens whenever the property is part of the design system.

---

# 27. Composition Philosophy

Pages should be assembled from reusable sections.

Typical landing page:

```jsx
<Navbar />
<Hero />
<Stats />
<Problem />
<Features />
<HowItWorks />
<Showcase />
<CTA />
<Footer />
```

A different hackathon can compose a different page without changing the design system:

```jsx
<Navbar />
<Hero />
<Problem />
<Solution />
<Architecture />
<Demo />
<Impact />
<Team />
<CTA />
<Footer />
```

The structure changes; the underlying design language does not.

---

# 28. Current Design-System Goal

The final boilerplate should make this possible:

```text
Choose theme
      ↓
Choose mode
      ↓
Choose page skeleton
      ↓
Replace content
      ↓
Replace project-specific components
      ↓
Ship
```

The system should minimize repetitive styling work during hackathons.

---

# 29. Future Extensions

Planned additions may include:

- system color mode (`system`)
- theme switcher UI
- persistent theme preference via localStorage
- multiple hero variants
- section variants
- reusable animation primitives
- background effects library
- documentation page
- component playground
- accessibility validation
- reduced-motion support
- project-specific theme presets

These should build on the current token architecture rather than replacing it.

---

# 30. Source of Truth

When implementing a new component, ask:

1. Can this use an existing semantic token?
2. Should this behavior work in every theme?
3. Does it remain readable in both modes?
4. Should the difference be controlled by a token instead of component-specific CSS?
5. Is this truly reusable, or is it project-specific?

The component should solve the reusable problem without leaking one project's visual assumptions into the design system.

---

## Final Rule

> **Components describe structure and behavior. Themes describe personality. Modes describe environment. Tokens connect everything.**

That separation is the foundation of this boilerplate.
