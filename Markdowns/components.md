# Reusable Components Implementation Sheet

> Source of truth for reusable components in the Hackathon Boilerplate.
>
> Companion document: `design.md`
>
> This document defines component APIs, variants, behavior, implementation rules, and usage patterns. Update it whenever a reusable component is added or its public API changes.

---

# 1. Component Architecture

The boilerplate separates reusable components into three layers:

```text
src/
└── components/
    ├── layout/
    │   ├── Container/
    │   ├── Section/
    │   └── ...
    │
    ├── common/
    │   ├── Button/
    │   ├── Badge/
    │   ├── Heading/
    │   ├── IconButton/
    │   ├── Divider/
    │   ├── Input/
    │   ├── Select/
    │   ├── Textarea/
    │   ├── Card/
    │   ├── Avatar/
    │   ├── Tooltip/
    │   ├── Spinner/
    │   └── ...
    │
    └── effects/
        ├── Glow/
        ├── Spotlight/
        ├── BackgroundGrid/
        └── ...
```

### Component rules

1. Every reusable component gets its own folder.
2. Component styles use CSS Modules.
3. Components consume semantic CSS variables instead of hardcoded theme colors.
4. Variants are expressed through props and CSS classes.
5. Components should solve one clear UI problem.
6. Complex page sections should be composed from smaller reusable components.
7. Accessibility behavior belongs inside the reusable component whenever practical.
8. New variants should be added only when they represent a real reusable pattern.

---

# 2. Theme and Mode Compatibility

Every reusable component must work with all 10 visual combinations:

```text
Cyber
├── Dark
└── Light

Aurora
├── Dark
└── Light

Luxury
├── Dark
└── Light

Minimal
├── Dark
└── Light

Brutalist
├── Dark
└── Light
```

Theme is controlled through:

```html
<html data-theme="cyber" data-mode="dark"></html>
```

Components must not directly inspect the active theme in JavaScript unless a genuine behavior difference requires it.

Prefer:

```css
background: var(--surface-1);
color: var(--text-primary);
border-color: var(--border-default);
```

Avoid:

```css
background: #111;
color: white;
border-color: #333;
```

---

# 3. Layout Components

## 3.1 Container

### Location

```text
src/components/layout/Container/
├── Container.jsx
└── Container.module.css
```

### Purpose

Controls page width and horizontal alignment.

### Props

| Prop        | Type      | Default | Description          |
| ----------- | --------- | ------- | -------------------- |
| `children`  | ReactNode | —       | Content              |
| `className` | string    | `""`    | Additional CSS class |

### Current implementation

```jsx
import styles from "./Container.module.css";

function Container({ children, className = "" }) {
  return <div className={`${styles.container} ${className}`}>{children}</div>;
}

export default Container;
```

### Usage

```jsx
<Container>
  <h1>Page content</h1>
</Container>
```

### Rules

Container should remain layout-only. It should not know about cards, typography, buttons, themes, or page sections.

---

## 3.2 Section

### Location

```text
src/components/layout/Section/
├── Section.jsx
└── Section.module.css
```

### Purpose

Controls vertical page-section spacing and semantic section structure.

### Props

| Prop        | Type      | Default     | Values                                |
| ----------- | --------- | ----------- | ------------------------------------- |
| `children`  | ReactNode | —           | Content                               |
| `className` | string    | `""`        | Additional CSS class                  |
| `id`        | string    | `undefined` | Anchor/section ID                     |
| `as`        | string    | `"section"` | HTML element                          |
| `spacing`   | string    | `"default"` | `small`, `default`, `large`, `xlarge` |

### Current implementation

```jsx
import styles from "./Section.module.css";

function Section({
  children,
  className = "",
  id,
  as: Component = "section",
  spacing = "default",
}) {
  return (
    <Component
      id={id}
      className={`${styles.section} ${styles[spacing]} ${className}`}
    >
      {children}
    </Component>
  );
}

export default Section;
```

### Usage

```jsx
<Section id="features">
  <Container>...</Container>
</Section>
```

Large section:

```jsx
<Section spacing="large">
  <Container>...</Container>
</Section>
```

### Standard page pattern

```jsx
<Section>
  <Container>...</Container>
</Section>
```

---

# 4. Common UI Components

# 4.1 Button

### Location

```text
src/components/common/Button/
├── Button.jsx
└── Button.module.css
```

### Purpose

Primary interactive action component.

### Variants

```text
primary
secondary
outline
ghost
danger
```

### Sizes

```text
small
medium
large
```

### Additional behavior

```text
icon
iconPosition
fullWidth
loading
disabled
```

### Props

| Prop           | Type      | Default     |
| -------------- | --------- | ----------- |
| `children`     | ReactNode | —           |
| `variant`      | string    | `"primary"` |
| `size`         | string    | `"medium"`  |
| `icon`         | ReactNode | `undefined` |
| `iconPosition` | string    | `"right"`   |
| `fullWidth`    | boolean   | `false`     |
| `loading`      | boolean   | `false`     |
| `disabled`     | boolean   | `false`     |
| `type`         | string    | `"button"`  |
| `onClick`      | function  | `undefined` |
| `className`    | string    | `""`        |

### Usage

```jsx
<Button>Get Started</Button>
```

```jsx
<Button variant="secondary">Learn More</Button>
```

```jsx
<Button variant="outline">View Demo</Button>
```

```jsx
<Button variant="ghost">Cancel</Button>
```

```jsx
<Button variant="danger">Delete</Button>
```

With icon:

```jsx
<Button icon={<ArrowRight size={16} />}>Continue</Button>
```

Left icon:

```jsx
<Button icon={<Github size={16} />} iconPosition="left">
  GitHub
</Button>
```

Loading:

```jsx
<Button loading>Saving</Button>
```

Full width:

```jsx
<Button fullWidth>Submit</Button>
```

### Implementation rules

- Never hardcode theme colors.
- Always provide a visible focus state.
- Disabled and loading states must block interaction.
- Loading must not create layout jumps.
- Use icons as supporting elements, not mandatory decoration.
- Do not create one-off button components for individual pages.

---

# 4.2 Badge

### Location

```text
src/components/common/Badge/
├── Badge.jsx
└── Badge.module.css
```

### Purpose

Small status, label, category, or metadata indicator.

### Theme-aware variants

```text
default
primary
accent
outline
```

### Semantic variants

```text
success
warning
danger
info
```

### Sizes

```text
small
medium
large
```

### Additional behavior

```text
dot
icon
```

### Props

| Prop        | Type      | Default     |
| ----------- | --------- | ----------- |
| `children`  | ReactNode | —           |
| `variant`   | string    | `"default"` |
| `size`      | string    | `"medium"`  |
| `icon`      | ReactNode | `undefined` |
| `dot`       | boolean   | `false`     |
| `className` | string    | `""`        |

### Usage

```jsx
<Badge>Featured</Badge>
```

```jsx
<Badge variant="primary">AI Powered</Badge>
```

```jsx
<Badge variant="accent">New</Badge>
```

```jsx
<Badge variant="outline">Beta</Badge>
```

Semantic status:

```jsx
<Badge variant="success" dot>
  Live
</Badge>
```

```jsx
<Badge variant="warning">Processing</Badge>
```

```jsx
<Badge variant="danger">Offline</Badge>
```

Icon:

```jsx
<Badge variant="accent" icon={<Sparkles size={13} />}>
  AI Powered
</Badge>
```

### Implementation rules

Theme-aware variants should use design tokens.

Semantic variants communicate state and should remain recognizable across all themes.

---

# 4.3 Heading

### Planned component

```text
src/components/common/Heading/
├── Heading.jsx
└── Heading.module.css
```

### Purpose

Reusable section-heading composition.

### Planned structure

```jsx
<Heading
  eyebrow="FEATURES"
  title="Everything you need."
  description="A flexible set of components for rapid product development."
  align="center"
/>
```

### Planned props

| Prop          | Type      | Default     | Values                             |
| ------------- | --------- | ----------- | ---------------------------------- |
| `eyebrow`     | string    | `undefined` | —                                  |
| `title`       | ReactNode | —           | —                                  |
| `description` | ReactNode | `undefined` | —                                  |
| `align`       | string    | `"left"`    | `left`, `center`, `right`          |
| `size`        | string    | `"large"`   | `small`, `medium`, `large`, `hero` |
| `as`          | string    | `"h2"`      | semantic heading tag               |
| `className`   | string    | `""`        | —                                  |

### Rules

The component must preserve heading hierarchy. Do not choose a heading tag solely for visual size.

---

# 4.4 IconButton

### Planned component

```text
src/components/common/IconButton/
├── IconButton.jsx
└── IconButton.module.css
```

### Purpose

Compact icon-only action.

### Planned variants

```text
default
primary
secondary
ghost
outline
danger
```

### Planned sizes

```text
small
medium
large
```

### Planned props

| Prop        | Type      | Default     |
| ----------- | --------- | ----------- |
| `icon`      | ReactNode | —           |
| `label`     | string    | —           |
| `variant`   | string    | `"default"` |
| `size`      | string    | `"medium"`  |
| `disabled`  | boolean   | `false`     |
| `loading`   | boolean   | `false`     |
| `onClick`   | function  | `undefined` |
| `className` | string    | `""`        |

### Important rule

`label` must provide an accessible name for screen readers.

Bad:

```jsx
<IconButton icon={<Menu />} />
```

Good:

```jsx
<IconButton icon={<Menu />} label="Open menu" />
```

---

# 4.5 Divider

### Planned component

```text
src/components/common/Divider/
├── Divider.jsx
└── Divider.module.css
```

### Variants

```text
solid
subtle
gradient
```

### Orientation

```text
horizontal
vertical
```

### Planned props

| Prop          | Type   | Default        |
| ------------- | ------ | -------------- |
| `orientation` | string | `"horizontal"` |
| `variant`     | string | `"subtle"`     |
| `className`   | string | `""`           |

---

# 4.6 Card

### Planned component

```text
src/components/common/Card/
├── Card.jsx
└── Card.module.css
```

### Variants

```text
default
elevated
glass
outlined
interactive
```

### Sizes

```text
small
medium
large
```

### Planned props

| Prop        | Type      | Default     |
| ----------- | --------- | ----------- |
| `children`  | ReactNode | —           |
| `variant`   | string    | `"default"` |
| `size`      | string    | `"medium"`  |
| `hoverable` | boolean   | `false`     |
| `className` | string    | `""`        |

### Rules

Card should provide visual containment, not dictate internal content layout.

Good composition:

```text
Card
+
FeatureCard
+
icon + heading + description
```

---

# 4.7 Input

### Planned component

```text
src/components/common/Input/
├── Input.jsx
└── Input.module.css
```

### States

```text
default
focus
filled
disabled
error
success
```

### Planned props

| Prop          | Type     | Default     |
| ------------- | -------- | ----------- |
| `label`       | string   | `undefined` |
| `placeholder` | string   | `undefined` |
| `value`       | string   | —           |
| `onChange`    | function | —           |
| `error`       | string   | `undefined` |
| `hint`        | string   | `undefined` |
| `disabled`    | boolean  | `false`     |
| `required`    | boolean  | `false`     |
| `type`        | string   | `"text"`    |
| `className`   | string   | `""`        |

### Rules

Inputs must have accessible labels. Error text should explain what needs correction.

---

# 4.8 Select

### Planned variants

```text
default
compact
```

### Planned states

```text
default
focus
disabled
error
```

---

# 4.9 Textarea

### Planned variants

Same interaction states as Input:

```text
default
focus
disabled
error
success
```

### Planned behavior

```text
resize
minRows
maxRows
characterCount
```

---

# 4.10 Avatar

### Planned variants

```text
image
initials
icon
```

### Sizes

```text
xs
small
medium
large
xl
```

### Status

```text
online
offline
busy
away
```

---

# 4.11 Spinner

### Planned variants

```text
default
accent
light
dark
```

### Sizes

```text
small
medium
large
```

Spinner should be reusable inside buttons, loading states, pages, and asynchronous UI.

---

# 4.12 Tooltip

### Planned positions

```text
top
right
bottom
left
```

### Planned behavior

- keyboard accessible
- pointer hover
- delayed appearance
- hidden or appropriately wrapped around disabled interactive elements

---

# 5. Effects Components

Effects are separate from common UI. They should enhance a page without becoming required for basic usability.

## Planned effects

```text
Glow
Spotlight
BackgroundGrid
GradientBlob
Noise
Orb
Glass
GradientBorder
Scanline
CursorGlow
```

### Example

```jsx
<BackgroundGrid />
```

```jsx
<Glow intensity="medium" />
```

```jsx
<Spotlight />
```

Effects should use theme variables:

```css
background: var(--glow-primary);
```

not hardcoded colors.

---

# 6. Component Variant Naming Rules

Use short semantic names.

Good:

```text
primary
secondary
outline
ghost
danger
success
```

Avoid:

```text
blue
purple
gold
blackButton
fancyButton
hackathonButton
```

The component API describes meaning, while the active theme determines appearance.

---

# 7. Size Naming Rules

Use a consistent vocabulary:

```text
small
medium
large
```

For components with tiny compact variants, `xs` may be added when genuinely necessary.

Do not mix several competing naming systems without a real reason.

---

# 8. State Naming Rules

Use consistent states:

```text
disabled
loading
error
success
active
selected
focused
```

States should not become visual variants when they represent interaction or status.

---

# 9. Accessibility Rules

Reusable components must establish sensible accessibility defaults.

## Buttons

- Use real `<button>` elements.
- Preserve keyboard interaction.
- Provide visible focus.
- Loading buttons should be disabled during loading.
- Do not hide button meaning inside icons only.

## Icon buttons

Always expose an accessible name.

## Inputs

Always associate labels with inputs.

## Headings

Preserve semantic heading hierarchy.

## Decorative icons

Use:

```jsx
aria-hidden="true"
```

when an icon adds no meaning beyond nearby text.

---

# 10. CSS Module Rules

Component CSS should generally follow:

```css
.component {
  /* base */
}

.variant {
  /* variant */
}

.size {
  /* size */
}

.component:hover {
  /* interaction */
}

.component:focus-visible {
  /* accessibility */
}

@media (...) {
  /* responsive */
}
```

Prefer semantic tokens:

```css
color: var(--text-primary);
background: var(--surface-1);
border: 1px solid var(--border-default);
```

Avoid theme-specific selectors inside component CSS:

```css
/* Avoid */
[data-theme="cyber"] .button {
  ...
}
```

The theme should affect the component through variables.

---

# 11. Component Composition Rules

Prefer composition over duplicated components.

Instead of:

```text
PrimaryButton
DangerButton
HeroButton
NavbarButton
CardButton
```

use:

```jsx
<Button variant="primary" />
<Button variant="danger" />
```

Instead of making many independent card implementations, build:

```text
Card
+
FeatureCard
+
ProductCard
+
TeamCard
```

where specialized cards compose the generic surface.

---

# 12. Standard Usage Pattern

A future page should look roughly like:

```jsx
<Section>
  <Container>
    <Heading
      eyebrow="FEATURES"
      title="Everything you need."
      description="..."
    />

    <div>
      <Card variant="glass">
        <Badge variant="primary">AI POWERED</Badge>

        <h3>Smart automation</h3>

        <p>...</p>

        <Button variant="outline" icon={<ArrowRight size={16} />}>
          Explore
        </Button>
      </Card>
    </div>
  </Container>
</Section>
```

This is the intended composition model.

---

# 13. Common Component Build Order

## Completed

```text
Container
Section
Button
Badge
```

## Next

```text
Heading
IconButton
Divider
Card
Input
Select
Textarea
Avatar
Spinner
Tooltip
```

## Higher-level reusable components

```text
Navbar
Footer
Hero
FeatureCard
StatCard
TestimonialCard
TeamCard
PricingCard
FAQItem
```

## Page sections

```text
Features
Stats
Problem
Solution
HowItWorks
Showcase
Testimonials
Team
FAQ
CTA
```

---

# 14. When to Add a New Variant

Before creating a new variant, ask:

```text
1. Is this pattern used more than once?
2. Does it represent a meaningful semantic difference?
3. Can the existing variant be configured instead?
4. Does the new variant work across all themes?
```

If the answer is no, prefer local composition rather than expanding the reusable API.

---

# 15. Definition of Done

A reusable component is considered complete when:

```text
[ ] Component folder created
[ ] JSX implementation complete
[ ] CSS Module complete
[ ] Base variant works
[ ] All variants work
[ ] All sizes work
[ ] Interactive states work
[ ] Disabled/loading/error states handled where relevant
[ ] Keyboard/focus behavior considered
[ ] Responsive behavior considered
[ ] Works in Cyber Dark
[ ] Works in Cyber Light
[ ] Works in Aurora Dark
[ ] Works in Aurora Light
[ ] Works in Luxury Dark
[ ] Works in Luxury Light
[ ] Works in Minimal Dark
[ ] Works in Minimal Light
[ ] Works in Brutalist Dark
[ ] Works in Brutalist Light
[ ] Added to Theme Lab when visual tuning is needed
[ ] Documented in this file
```

---

# 16. Source-of-Truth Files

```text
design.md
    ↓
Design tokens, themes, modes, visual language

components.md
    ↓
Component APIs, variants, states, implementation rules

Theme Lab
    ↓
Visual verification of all theme/mode combinations
```

These resources should remain synchronized.

---

# 17. Core Principle

The boilerplate should make this possible:

```text
NEW HACKATHON
      ↓
Choose theme
      ↓
Choose dark/light mode
      ↓
Compose existing components
      ↓
Add project-specific components
      ↓
Build actual product
```

The reusable system should reduce setup work while still leaving enough flexibility for the actual hackathon idea to have its own identity.
